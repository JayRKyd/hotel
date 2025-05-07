import { Database } from 'better-sqlite3';

export const initializeDatabase = (db: Database) => {
  // Countries table
  db.exec(`
    CREATE TABLE IF NOT EXISTS countries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      is_active BOOLEAN DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Cities/Destinations table
  db.exec(`
    CREATE TABLE IF NOT EXISTS destinations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      country_id INTEGER,
      name TEXT NOT NULL,
      is_active BOOLEAN DEFAULT 1,
      sort_order INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (country_id) REFERENCES countries (id)
    );
  `);

  // Recommended Places table
  db.exec(`
    CREATE TABLE IF NOT EXISTS recommended_places (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      destination_id INTEGER,
      name TEXT NOT NULL,
      description TEXT,
      photo_url TEXT,
      is_active BOOLEAN DEFAULT 1,
      sort_order INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (destination_id) REFERENCES destinations (id)
    );
  `);

  // Room Types table
  db.exec(`
    CREATE TABLE IF NOT EXISTS room_types (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      hotel_id INTEGER,
      name TEXT NOT NULL,
      meal_plan TEXT CHECK(meal_plan IN ('No Meals', 'Breakfast', 'Half-Board', 'All Inclusive', 'Ultra All Inclusive')),
      max_adults INTEGER DEFAULT 2,
      max_children INTEGER DEFAULT 2,
      max_infants INTEGER DEFAULT 1,
      pdf_url TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (hotel_id) REFERENCES hotels (id)
    );
  `);

  // Room Photos table
  db.exec(`
    CREATE TABLE IF NOT EXISTS room_photos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      room_type_id INTEGER,
      photo_url TEXT NOT NULL,
      sort_order INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (room_type_id) REFERENCES room_types (id)
    );
  `);
}; 