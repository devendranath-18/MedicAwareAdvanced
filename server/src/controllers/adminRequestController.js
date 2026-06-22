import pool from "../config/db.js";

export const getPendingRequests=
async(req,res)=>{

try{

const result=
await pool.query(
`
SELECT *
FROM missing_medicine_requests
WHERE status='pending'
ORDER BY created_at DESC
`
);

res.json({

success:true,
data:result.rows

});

}
catch(error){

console.log(error);

res.status(500).json({

success:false,
message:error.message

});

}

};