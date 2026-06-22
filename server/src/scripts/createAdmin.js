import bcrypt from "bcryptjs";
import pool from "../config/db.js";

const createAdmin=async()=>{

try{

const hashedPassword=
await bcrypt.hash(
"ADMIN_PASSWORD",
10
);

await pool.query(

`
INSERT INTO admins(
username,
password
)

VALUES($1,$2)
`,

[
"ADMIN_USERNAME",
hashedPassword
]

);

console.log(
"Admin created successfully ✅"
);

process.exit();

}
catch(error){

console.log(error);

}

};

createAdmin();