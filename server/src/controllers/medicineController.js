import pool from "../config/db.js";

export const searchMedicine = async (req, res) => {
  try {
    const { name = "" } = req.query;

    if (!name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Medicine name required",
      });
    }

    const result = await pool.query(
      `
      SELECT
        id,
        medicine_name,
        composition,
        uses,
        side_effects,
        image_url,
        manufacturer,
        excellent_review_percent,
        average_review_percent,
        poor_review_percent
      FROM medicines
      WHERE medicine_name ILIKE $1
      ORDER BY medicine_name
      LIMIT 10
      `,
      [`%${name}%`],
    );

    res.status(200).json({
      success: true,
      count: result.rows.length,
      data: result.rows,
    });
  } catch (error) {
    console.log("Search error:", error.message);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getSuggestions = async (req, res) => {
  try {
    const { query = "" } = req.query;

    if (!query.trim()) {
      return res.json([]);
    }

    const result = await pool.query(
      `
      SELECT
        id,
        medicine_name
      FROM medicines
      WHERE medicine_name ILIKE $1
      LIMIT 5
      `,
      [`${query}%`],
    );

    res.json(result.rows);
  } catch (error) {
    console.log("Suggestion error:", error.message);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
export const requestMedicine = async (req, res) => {
  try {
    const { medicine_name } = req.body;

    if (!medicine_name?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Medicine name required",
      });
    }

    const existing = await pool.query(
      `
      SELECT *
      FROM missing_medicine_requests
      WHERE LOWER(medicine_name)=LOWER($1)
      `,
      [medicine_name],
    );

    if (existing.rows.length > 0) {
      await pool.query(
        `
        UPDATE missing_medicine_requests
        SET request_count=request_count+1
        WHERE LOWER(medicine_name)=LOWER($1)
        `,
        [medicine_name],
      );

      return res.json({
        success: true,
        message: "Request updated successfully",
      });
    }

    await pool.query(
      `
      INSERT INTO missing_medicine_requests(
      medicine_name
      )
      VALUES($1)
      `,
      [medicine_name],
    );

    res.json({
      success: true,
      message: "Medicine request submitted",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
export const getMedicineById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      SELECT *
      FROM medicines
      WHERE id=$1
      `,
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Medicine not found",
      });
    }

    res.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const addReview = async (req, res) => {
  try {
    

    const { medicine_id, rating, review } = req.body;

    const result = await pool.query(
      `
      INSERT INTO reviews
      (medicine_id,rating,review)

      VALUES($1,$2,$3)

      RETURNING *
      `,
      [medicine_id, rating, review]
    );

    res.status(201).json({
      success: true,
      data: result.rows[0],
    });

  } catch(error) {
    


    res.status(500).json({
      success:false,
      message:error.message
    });
  }
};
export const getReviews = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
SELECT *
FROM reviews
WHERE medicine_id=$1
ORDER BY created_at DESC
`,

      [id],
    );

    res.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.log(error);
  }
};
export const scanMedicines = async (req, res) => {
  try {
    const { text } = req.body;

    const words = text
      .split(/[\n,]/)
      .map((item) => item.trim())
      .filter((item) => item.length > 2);

    let matchedMedicines = [];

    for (const word of words) {
      const result = await pool.query(
        `
SELECT *
FROM medicines
WHERE similarity(
LOWER(medicine_name),
LOWER($1)
) > 0.3

ORDER BY similarity(
LOWER(medicine_name),
LOWER($1)
)

DESC

LIMIT 1
`,
        [word],
      );

      matchedMedicines.push(...result.rows);
    }

    const unique = [
      ...new Map(matchedMedicines.map((item) => [item.id, item])).values(),
    ];

    res.json({
      success: true,
      data: unique,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
    });
  }
};
