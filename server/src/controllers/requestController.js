import pool from "../config/db.js";

export const requestMedicine = async (req, res) => {
  try {
    console.log("API reached");

    const { medicine_name } = req.body;

    console.log("Received:", medicine_name);

    if (!medicine_name?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Medicine name required",
      });
    }

    console.log("Before DB insert");

    const result = await pool.query(
      `
      INSERT INTO missing_medicine_requests
      (medicine_name)
      VALUES($1)
      RETURNING *
      `,
      [medicine_name]
    );

    console.log("Inserted:", result.rows);

    res.status(201).json({
      success: true,
      message: "Request submitted successfully",
    });

  } catch (error) {

    console.log("FULL ERROR:");
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};