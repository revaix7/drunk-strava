import * as SQLite from 'expo-sqlite';
import { Night } from '../types';

let db: SQLite.SQLiteDatabase | null = null;

async function getDB(): Promise<SQLite.SQLiteDatabase> {
  if (!db) {
    db = await SQLite.openDatabaseAsync('drunk_strava.db');
    await initDB();
  }
  return db;
}

async function initDB(): Promise<void> {
  if (!db) return;

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS nights (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      started_at TEXT NOT NULL,
      ended_at TEXT,
      title TEXT,
      bac_self_reported REAL,
      total_distance_m REAL DEFAULT 0,
      duration_seconds INTEGER DEFAULT 0,
      max_sway_score REAL DEFAULT 0,
      route TEXT NOT NULL DEFAULT '[]',
      checkpoints TEXT NOT NULL DEFAULT '[]',
      created_at TEXT NOT NULL
    );
  `);
}

export async function saveNight(night: Night): Promise<void> {
  const database = await getDB();

  await database.runAsync(
    `INSERT OR REPLACE INTO nights (
      id, user_id, started_at, ended_at, title, bac_self_reported,
      total_distance_m, duration_seconds, max_sway_score, route, checkpoints, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      night.id,
      night.user_id,
      night.started_at,
      night.ended_at,
      night.title,
      night.bac_self_reported,
      night.total_distance_m,
      night.duration_seconds,
      night.max_sway_score,
      JSON.stringify(night.route),
      JSON.stringify(night.checkpoints),
      night.created_at,
    ]
  );
}

export async function getNights(): Promise<Night[]> {
  const database = await getDB();

  const rows = await database.getAllAsync(
    `SELECT * FROM nights ORDER BY started_at DESC`
  );

  return rows.map((row: any) => ({
    id: row.id,
    user_id: row.user_id,
    started_at: row.started_at,
    ended_at: row.ended_at,
    title: row.title,
    bac_self_reported: row.bac_self_reported,
    total_distance_m: row.total_distance_m,
    duration_seconds: row.duration_seconds,
    max_sway_score: row.max_sway_score,
    route: JSON.parse(row.route),
    checkpoints: JSON.parse(row.checkpoints),
    created_at: row.created_at,
  }));
}

export async function getNight(id: string): Promise<Night | null> {
  const database = await getDB();

  const row = await database.getFirstAsync(
    `SELECT * FROM nights WHERE id = ?`,
    [id]
  );

  if (!row) return null;

  const r = row as any;
  return {
    id: r.id,
    user_id: r.user_id,
    started_at: r.started_at,
    ended_at: r.ended_at,
    title: r.title,
    bac_self_reported: r.bac_self_reported,
    total_distance_m: r.total_distance_m,
    duration_seconds: r.duration_seconds,
    max_sway_score: r.max_sway_score,
    route: JSON.parse(r.route),
    checkpoints: JSON.parse(r.checkpoints),
    created_at: r.created_at,
  };
}
