import pool from "../config/db.js";

export const addMedicine = async (req,res)=>{

try{

const {

requestId,
medicine_name,
composition,
uses,
side_effects,
image_url,
manufacturer

}=req.body;


await pool.query(

`
INSERT INTO medicines(

medicine_name,
composition,
uses,
side_effects,
image_url,
manufacturer,
excellent_review_percent,
average_review_percent,
poor_review_percent

)

VALUES(

$1,$2,$3,$4,$5,$6,$7,$8,$9

)
`,

[
medicine_name,
composition,
uses,
side_effects,
image_url,
manufacturer,
0,
0,
0
]

);


await pool.query(

`
UPDATE missing_medicine_requests
SET status='completed'
WHERE id=$1
`,

[requestId]

);

res.json({

success:true,
message:"Medicine added successfully"

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