// This script runs inside the Mongo container on first initialization.
// It targets the database specified by MONGO_INITDB_DATABASE environment variable
// if set, otherwise defaults to 'test'.
// For consistency, let's explicitly switch to the database used by our app.

// Use the database name defined in your .env file (e.g., musicTracksDB)
const dbName = process.env.MONGO_DB_NAME || 'musicTracksDB';
db = db.getSiblingDB(dbName);

print(`[Seed Script] Starting seeding for database: ${dbName}`);

// Optional: Check if the collection already has data (useful if script runs unexpectedly)
const count = db.tracks.countDocuments();
if (count > 0) {
  print(`[Seed Script] Collection 'tracks' already contains ${count} documents. Skipping seeding.`);
} else {
  print("[Seed Script] Seeding initial track data...");

  const initialTracks = [
    // Original 3
    { title: "The Emptiness Machine", artist: "Linkin Park", album: "From Zero" },
    { title: "Firestarter", artist: "The Prodigy", album: "Fat of the Land" },
    { title: "Australia", artist: "The Manic Street Preachers", album: "Everything Must Go" }, // Corrected Album for Australia
    // Add more tracks (approx 47) - Using fictional/generic data
    { title: "Quantum Leap", artist: "Synthwave Masters", album: "Neon Nights" },
    { title: "Echoes in Time", artist: "Ambient Explorers", album: "Soundscapes Vol. 1" },
    { title: "Midnight Drive", artist: "Synthwave Masters", album: "Neon Nights" },
    { title: "Lost Signal", artist: "Glitch Mob", album: "Drink the Sea" }, // Example real track
    { title: "Starlight", artist: "Muse", album: "Black Holes and Revelations" }, // Example real track
    { title: "Solar Sailer", artist: "Daft Punk", album: "TRON: Legacy OST" }, // Example real track
    { title: "Crimson Sun", artist: "Epic Score", album: "Action & Adventure" },
    { title: "Forest Awakening", artist: "Nature Sounds", album: "Relaxation Suite" },
    { title: "Urban Pulse", artist: "Lo-Fi Beats", album: "Study Session" },
    { title: "Cybernetic Dream", artist: "Tech Noir", album: "Future City" },
    { title: "Ocean's Breath", artist: "Ambient Explorers", album: "Soundscapes Vol. 2" },
    { title: "Desert Mirage", artist: "World Music Collective", album: "Global Rhythms" },
    { title: "Mountain Call", artist: "Nature Sounds", album: "Relaxation Suite" },
    { title: "Retro Rewind", artist: "Synthwave Masters", album: "Arcade Days" },
    { title: "Digital Ghost", artist: "Glitch Mob", album: "Love Death Immortality" }, // Example real track
    { title: "Uprising", artist: "Muse", album: "The Resistance" }, // Example real track
    { title: "The Grid", artist: "Daft Punk", album: "TRON: Legacy OST" }, // Example real track
    { title: "Zero Gravity", artist: "Epic Score", album: "Sci-Fi Adventures" },
    { title: "Rainy Day", artist: "Lo-Fi Beats", album: "Chill Vibes" },
    { title: "Neon Alley", artist: "Tech Noir", album: "Future City" },
    { title: "Coastal Serenity", artist: "Ambient Explorers", album: "Soundscapes Vol. 3" },
    { title: "Jungle Beat", artist: "World Music Collective", album: "Global Rhythms" },
    { title: "Alpine Echo", artist: "Nature Sounds", album: "Mountain Air" },
    { title: "Galactic Voyage", artist: "Synthwave Masters", album: "Space Odyssey" },
    { title: "Mechanical Heart", artist: "Glitch Mob", album: "See Without Eyes" }, // Example real track
    { title: "Panic Station", artist: "Muse", album: "The 2nd Law" }, // Example real track
    { title: "Adagio for TRON", artist: "Daft Punk", album: "TRON: Legacy OST" }, // Example real track
    { title: "Final Stand", artist: "Epic Score", album: "Action & Adventure" },
    { title: "Cafe Corner", artist: "Lo-Fi Beats", album: "Study Session" },
    { title: "Data Stream", artist: "Tech Noir", album: "System Shock" },
    { title: "Island Breeze", artist: "Ambient Explorers", album: "Tropical Dreams" },
    { title: "Savanna Dance", artist: "World Music Collective", album: "African Sun" },
    { title: "River Flow", artist: "Nature Sounds", album: "Water's Journey" },
    { title: "Laser Grid", artist: "Synthwave Masters", album: "Arcade Days" },
    { title: "Mind of a Beast", artist: "The Glitch Mob", album: "Drink the Sea" }, // Example real track (variation)
    { title: "Madness", artist: "Muse", album: "The 2nd Law" }, // Example real track
    { title: "End of Line", artist: "Daft Punk", album: "TRON: Legacy OST" }, // Example real track
    { title: "Victory Lap", artist: "Epic Score", album: "Triumphant Moments" },
    { title: "Night Shift", artist: "Lo-Fi Beats", album: "Chill Vibes" },
    { title: "Chrome Reflections", artist: "Tech Noir", album: "System Shock" },
    { title: "Deep Dive", artist: "Ambient Explorers", album: "Underwater Worlds" },
    { title: "Nomad's Trail", artist: "World Music Collective", album: "Desert Winds" },
    { title: "Wind Chimes", artist: "Nature Sounds", album: "Peaceful Garden" },
    { title: "Time Warp", artist: "Synthwave Masters", album: "Space Odyssey" },
    { title: "Reaching", artist: "Epic Score", album: "Hope & Glory" },
    { title: "Moonlight", artist: "Lo-Fi Beats", album: "Night Drive" },
    { title: "Final Frontier", artist: "Orchestral Suite", album: "Epic Scores Vol II" } // ~50th track
  ];

  try {
    const result = db.tracks.insertMany(initialTracks);
    print(`[Seed Script] Successfully seeded ${result.insertedIds.length} tracks.`);

    // Optional: Create indexes after seeding data for better performance
    print("[Seed Script] Creating indexes on 'tracks' collection...");
    db.tracks.createIndex({ title: 1 });
    db.tracks.createIndex({ artist: 1 });
    db.tracks.createIndex({ album: 1 });
    db.tracks.createIndex({ createdAt: -1 }); // Example index for sorting by date
    print("[Seed Script] Indexes created.");

  } catch (e) {
    print("[Seed Script] Error during seeding:");
    printjson(e);
  }
}

print(`[Seed Script] Seeding process finished for database: ${dbName}`);