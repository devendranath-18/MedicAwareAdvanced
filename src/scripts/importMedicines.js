import fs from "fs";
import path from "path";
import csv from "csv-parser";
import pool from "../config/db.js";

const medicines = [];

const filePath = path.join(
  process.cwd(),
  "../dataset/Medicine_Details.csv"
);

const BATCH_SIZE = 500;

fs.createReadStream(filePath)
  .pipe(csv())
  .on("data", (row) => {
    medicines.push([
      row["Medicine Name"] || null,
      row["Composition"] || null,
      row["Uses"] || null,
      row["Side_effects"] || null,
      row["Image URL"] || null,
      row["Manufacturer"] || null,
      parseInt(row["Excellent Review %"]) || 0,
      parseInt(row["Average Review %"]) || 0,
      parseInt(row["Poor Review %"]) || 0,
    ]);
  })

  .on("end", async () => {
    try {
      console.log(
        `Starting import of ${medicines.length} medicines...`
      );

      for (let i = 0; i < medicines.length; i += BATCH_SIZE) {
        const batch = medicines.slice(i, i + BATCH_SIZE);

        const values = [];
        const placeholders = [];

        batch.forEach((med, index) => {
          const offset = index * 9;

          placeholders.push(
            `($${offset + 1},
              $${offset + 2},
              $${offset + 3},
              $${offset + 4},
              $${offset + 5},
              $${offset + 6},
              $${offset + 7},
              $${offset + 8},
              $${offset + 9})`
          );

          values.push(...med);
        });

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
          VALUES ${placeholders.join(",")}
          `,
          values
        );

        console.log(
          `Imported ${Math.min(
            i + BATCH_SIZE,
            medicines.length
          )}/${medicines.length}`
        );
      }

      console.log(
        "Medicine import completed successfully ✅"
      );

      process.exit();

    } catch (error) {
      console.log(
        "Import error:",
        error.message
      );
    }
  });