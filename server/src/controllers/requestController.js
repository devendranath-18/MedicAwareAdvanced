import pool from "../config/db.js";

export const requestMedicine = async (req, res) => {
  try {
    const { medicine_name } = req.body;

    if (!medicine_name?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Medicine name required",
      });
    }

    await pool.query(
      `
      INSERT INTO missing_medicine_requests
      (medicine_name)
      VALUES($1)

      ON CONFLICT (medicine_name)
      DO NOTHING
      `,
      [medicine_name]
    );

    res.status(201).json({
      success: true,
      message: "Request submitted successfully",
    });

  } catch(error) {

    console.log(error);

    res.status(500).json({
      success:false,
      message:"Internal Server Error"
    });
  }
};