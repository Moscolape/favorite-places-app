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
        address TEXT NOT NULL,
        lat REAL NOT NULL,
        lng REAL NOT NULL
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
    const result = await db.runAsync(
      `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
      [
        place.title,
        place.imageUri,
        place.address,
        place.location.lat,
        place.location.lng,
      ]
    );

    console.log("Place inserted successfully:", result);
    return result;
  } catch (error) {
    console.error("Error inserting place:", error);
    throw error;
  }
}
