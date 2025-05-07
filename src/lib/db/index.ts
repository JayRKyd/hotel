import Database from 'better-sqlite3';
import { initializeDatabase } from '@/lib/db/schema';

let db: Database.Database;

export const getDatabase = () => {
  if (!db) {
    db = new Database(':memory:'); // Using in-memory database for development
    initializeDatabase(db);
    
    // Insert initial data
    insertInitialData(db);
  }
  return db;
};

const insertInitialData = (db: Database.Database) => {
  // Insert countries
  const countries = [
    { name: 'Thailand' },
    { name: 'Malaysia' },
    { name: 'Turkey' },
    { name: 'Georgia' }
  ];

  const thailandCities = [
    'Bangkok', 'Chiang Mai', 'Chiang Rai', 'Phuket', 'Koh Samui',
    'Krabi', 'Koh Phi Phi', 'Koh Lanta', 'Koh Tao', 'Koh Chang', 'Koh Phangan'
  ];

  const malaysiaCities = [
    'Kuala Lumpur', 'Penang', 'Langkawi'
  ];

  const turkeyCities = [
    'Istanbul', 'Ankara', 'Izmir', 'Bursa', 'Cappadocia',
    'Antalya', 'Bodrum', 'Fethiye', 'Pamukkale'
  ];

  const georgiaCities = [
    'Tbilisi', 'Batumi', 'Gudauri', 'Borjomi'
  ];

  const insertCountry = db.prepare('INSERT INTO countries (name) VALUES (?)');
  const insertCity = db.prepare('INSERT INTO destinations (country_id, name) VALUES (?, ?)');

  db.transaction(() => {
    countries.forEach((country, index) => {
      const { lastInsertRowid } = insertCountry.run(country.name);
      const countryId = lastInsertRowid;

      let cities: string[] = [];
      switch (index) {
        case 0: cities = thailandCities; break;
        case 1: cities = malaysiaCities; break;
        case 2: cities = turkeyCities; break;
        case 3: cities = georgiaCities; break;
      }

      cities.forEach(city => {
        insertCity.run(countryId, city);
      });
    });
  })();
}; 