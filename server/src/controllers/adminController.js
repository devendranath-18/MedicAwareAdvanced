import pool from "../config/db.js";

export const getDashboardStats = async (req,res)=>{

try{

const medicines=await pool.query(
`
SELECT COUNT(*) 
FROM medicines
`
);

const reviews=await pool.query(
`
SELECT COUNT(*)
FROM reviews
`
);

const pending=await pool.query(
`
SELECT COUNT(*)
FROM missing_medicine_requests
WHERE status='pending'
`
);

const completed=await pool.query(
`
SELECT COUNT(*)
FROM missing_medicine_requests
WHERE status='completed'
`
);

res.json({

success:true,

data:{

totalMedicines:
parseInt(
medicines.rows[0].count
),

totalReviews:
parseInt(
reviews.rows[0].count
),

pendingRequests:
parseInt(
pending.rows[0].count
),

completedRequests:
parseInt(
completed.rows[0].count
)

}

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
export const rejectRequest=
async(req,res)=>{

try{

const {id}=req.params;

await pool.query(

`
UPDATE
missing_medicine_requests
SET status='Rejected'
WHERE id=$1
`,

[id]

);

res.json({

success:true,
message:
"Request rejected"

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