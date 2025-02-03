// backend/src/utils/db.js
const sqlite3 = require('sqlite3').verbose();

const DBSOURCE = './db.sqlite';

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error("Erro ao conectar no banco de dados:", err.message);
    throw err;
  } else {
    console.log("Conectado ao banco de dados SQLite.");

    // Criação das tabelas
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      avatar TEXT,
      level INTEGER DEFAULT 0,
      points INTEGER DEFAULT 0,
      theme TEXT DEFAULT 'dark',
  color_scheme TEXT DEFAULT '{"primary":"#FF6B6B","secondary":"#4ECDC4"}',
  unlocked_items TEXT DEFAULT '[]',
  last_achievement DATETIME
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS activities (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      points INTEGER NOT NULL,
      user_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      difficulty TEXT DEFAULT 'medium',
      streak_id INTEGER,
      xp_earned INTEGER,
      is_completed BOOLEAN DEFAULT FALSE,
      completion_date DATETIME,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS finances (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      type TEXT NOT NULL,        
      value REAL NOT NULL,
      description TEXT,
      date DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )`);


    // Tabelas de badges (opcional)
    // Modifique a tabela badges para incluir tipo e progresso
db.run(`CREATE TABLE IF NOT EXISTS badges (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  image TEXT,
  type TEXT CHECK(type IN ('points', 'activity_count', 'custom')) NOT NULL,
  target INTEGER NOT NULL,  
  criteria TEXT,           
  xp_reward INTEGER DEFAULT 0,
  repeatable BOOLEAN DEFAULT FALSE
)`);

db.run(`
  CREATE TABLE IF NOT EXISTS user_badges (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    badge_id INTEGER NOT NULL,
    obtained_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    progress INTEGER DEFAULT 0,
    unlocked BOOLEAN DEFAULT FALSE,
    unlocked_count INTEGER DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (badge_id) REFERENCES badges(id)
  )
`);

    db.run(`CREATE TABLE IF NOT EXISTS streaks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      current_count INTEGER DEFAULT 0,
      longest_streak INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )`);
    
    // Atualize a tabela activities
    // db.run(`ALTER TABLE activities ADD COLUMN difficulty TEXT DEFAULT 'medium'`);
    // db.run(`ALTER TABLE activities ADD COLUMN streak_id INTEGER`);
    // db.run(`ALTER TABLE activities ADD COLUMN xp_earned INTEGER`);
    // db.run(`ALTER TABLE activities ADD COLUMN is_completed BOOLEAN DEFAULT FALSE`);
    // db.run(`ALTER TABLE activities ADD COLUMN completion_date DATETIME`);
  }
});

module.exports = db;
