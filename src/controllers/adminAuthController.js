import pool from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginAdmin=async(req,res)=>{

try{

const {
username,
password
}=req.body;

const result=
await pool.query(

`
SELECT *
FROM admins
WHERE username=$1
`,

[username]

);

if(
result.rows.length===0
){

return res.status(401)
.json({

success:false,
message:"Invalid username"

});

}

const admin=
result.rows[0];

const isMatch=
await bcrypt.compare(

password,
admin.password

);

if(!isMatch){

return res.status(401)
.json({

success:false,
message:"Invalid password"

});

}

const token=
jwt.sign(

{
id:admin.id
},

process.env.JWT_SECRET,

{
expiresIn:"7d"
}

);

res.json({

success:true,
token,
username:
admin.username

});

}
catch(error){

console.log(error);

res.status(500)
.json({

success:false,
message:error.message

});

}

};