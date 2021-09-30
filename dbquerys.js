export const CREATE_USERS_TABLE = `CREATE TABLE IF NOT EXISTS users  (
user_id INTEGER PRIMARY KEY AUTOINCREMENT,
full_name TEXT NOT NULL,
date_of_birth REAL NOT NULL,
dni TEXT NOT NULL UNIQUE,
phone TEXT,
email TEXT NOT NULL,
username TEXT NOT NULL UNIQUE,
password TEXT NOT NULL,
created_at TEXT DEFAULT (datetime('now')),
updated_at TEXT
)`;

export const CREATE_ACCOUNTS_TABLE = `CREATE TABLE IF NOT EXISTS accounts (
account_id TEXT PRIMARY KEY UNIQUE NOT NULL,
user_id INTEGER,
cbu TEXT NOT NULL,
balance INTEGER NOT NULL,
currency TEXT NOT NULL,
pin TEXT DEFAULT '',
created_at TEXT DEFAULT (datetime('now')),
updated_at TEXT,
FOREIGN KEY(user_id) REFERENCES users(user_id)
);`;

export const CREATE_TRANSFERS_TABLE = `CREATE TABLE IF NOT EXISTS transfers (
transfer_id INTEGER PRIMARY KEY AUTOINCREMENT,
origin_account TEXT NOT NULL,
destiny_account TEXT NOT NULL,
value INTEGER NOT NULL,
created_at TEXT DEFAULT (datetime('now')),
updated_at TEXT,
remaining_balance INTEGER NOT NULL,
status TEXT NOT NULL DEFAULT pending,
FOREIGN KEY(origin_account) REFERENCES accounts(account_id),
FOREIGN KEY(destiny_account) REFERENCES accounts(account_id)
);`;

export const CREATE_DEPOSITS_TABLE = `CREATE TABLE IF NOT EXISTS deposits (
deposit_id INTEGER PRIMARY KEY,
account_id TEXT,
created_at TEXT DEFAULT (datetime('now')),
expire_date REAL,
FOREIGN KEY(account_id) REFERENCES accounts(account_id)
);`;

export const CREATE_MOVEMENTS_TABLE = `CREATE TABLE IF NOT EXISTS movements (
movement_id INTEGER PRIMARY KEY AUTOINCREMENT,
account_id TEXT NOT NULL,
description TEXT,
created_at TEXT DEFAULT (datetime('now')),
import_value INTEGER NOT NULL,
balance INTEGER NOT NULL,
FOREIGN KEY(account_id) REFERENCES accounts(account_id)
);`;
