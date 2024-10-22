import * as SQLite from "expo-sqlite";

async function openDatabase() {
  return await SQLite.openDatabaseAsync("places.db");
}

export async function init() {
  const db = await openDatabase();

  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS places (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        imageUri TEXT NOT NULL,
        address TEXT,
        lat REAL,
        lng REAL
      );
    `);

    console.log("Table created successfully!");
    return "Table created successfully!";
  } catch (error) {
    console.error("Error creating table:", error);
    throw error;
  }
}

export async function insertPlace(place) {
  const db = await openDatabase();

  try {
    // Ensure all nullable values are explicitly set to null if undefined
    const title = place.title || null;
    const imageUri = place.imageUri || null;
    // const address = place.address ? place.address : null;
    // const lat = place.location?.lat ?? null;
    // const lng = place.location?.lng ?? null;

    // Log the data to check for potential null values
    console.log("Inserting place with data:", { title, imageUri});

    const result = await db.runAsync(
      `INSERT INTO places (title, imageUri) VALUES (?, ?)`,
      [title, imageUri]
    );

    console.log("Place inserted successfully:", result);
    return result;
  } catch (error) {
    console.error("Error inserting place:", error);
    throw error;
  }
}
