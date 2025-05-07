import { getDatabase } from './index';

export interface RecommendedPlace {
  id?: number;
  destination_id: number;
  name: string;
  description: string;
  photo_url: string;
  is_active: boolean;
  sort_order: number;
}

export const recommendedPlacesDb = {
  getAll: () => {
    const db = getDatabase();
    return db.prepare(`
      SELECT rp.*, d.name as destination_name, c.name as country_name
      FROM recommended_places rp
      JOIN destinations d ON rp.destination_id = d.id
      JOIN countries c ON d.country_id = c.id
      ORDER BY rp.sort_order
    `).all();
  },

  getByDestination: (destinationId: number) => {
    const db = getDatabase();
    return db.prepare(`
      SELECT * FROM recommended_places
      WHERE destination_id = ? AND is_active = 1
      ORDER BY sort_order
    `).all(destinationId);
  },

  create: (place: RecommendedPlace) => {
    const db = getDatabase();
    const { lastInsertRowid } = db.prepare(`
      INSERT INTO recommended_places (
        destination_id, name, description, photo_url, is_active, sort_order
      ) VALUES (?, ?, ?, ?, ?, ?)
    `).run(
      place.destination_id,
      place.name,
      place.description,
      place.photo_url,
      place.is_active ? 1 : 0,
      place.sort_order
    );
    return lastInsertRowid;
  },

  update: (id: number, place: Partial<RecommendedPlace>) => {
    const db = getDatabase();
    const sets = Object.entries(place)
      .map(([key]) => `${key} = @${key}`)
      .join(', ');
    
    return db.prepare(`
      UPDATE recommended_places
      SET ${sets}
      WHERE id = @id
    `).run({ ...place, id });
  },

  delete: (id: number) => {
    const db = getDatabase();
    return db.prepare('DELETE FROM recommended_places WHERE id = ?').run(id);
  }
}; 