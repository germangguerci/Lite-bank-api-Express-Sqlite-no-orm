export const CREATE_USERS_TABLE = `CREATE TABLE IF NOT EXISTS users  (
user_id INTEGER PRIMARY KEY AUTOINCREMENT,
full_name TEXT NOT NULL,
date_of_birth REAL NOT NULL,
dni TEXT NOT NULL UNIQUE,
phone TEXT,
email TEXT NOT NULL,
username TEXT NOT NULL UNIQUE,
password TEXT NOT NULL,
created_at TEXT DEFAULT (datetime('now','localtime')),
updated_at TEXT
)`;

export const CREATE_ACCOUNTS_TABLE = `CREATE TABLE IF NOT EXISTS accounts (
account_id TEXT PRIMARY KEY UNIQUE NOT NULL,
user_id INTEGER,
cbu TEXT NOT NULL,
balance INTEGER NOT NULL,
currency TEXT NOT NULL,
pin TEXT DEFAULT '',
created_at TEXT DEFAULT (datetime('now','localtime')),
updated_at TEXT,
FOREIGN KEY(user_id) REFERENCES users(user_id)
);`;

export const CREATE_TRANSFERS_TABLE = `CREATE TABLE IF NOT EXISTS transfers (
transfer_id INTEGER PRIMARY KEY AUTOINCREMENT,
origin_account TEXT NOT NULL,
destiny_account TEXT NOT NULL,
value INTEGER NOT NULL,
created_at TEXT DEFAULT (datetime('now','localtime')),
updated_at TEXT,
remaining_balance INTEGER NOT NULL,
status TEXT NOT NULL DEFAULT pending,
FOREIGN KEY(origin_account) REFERENCES accounts(account_id),
FOREIGN KEY(destiny_account) REFERENCES accounts(account_id)
);`;

export const CREATE_DEPOSITS_TABLE = `CREATE TABLE IF NOT EXISTS deposits (
deposit_id INTEGER PRIMARY KEY,
account_id INTEGER,
created_at TEXT DEFAULT (datetime('now','localtime')),
expire_date REAL,
FOREIGN KEY(account_id) REFERENCES accounts(account_id)
);`;

/* INSERT INTO users (full_name, date_of_birth, dni, phone, email, username, password)
VALUES ('german gerardo guerci', julianday('1996-10-08'), '40130627', '542257636857', 'germangguerci@gmail.com', 'germangguerci', 'tobogan') ;

INSERT INTO accounts (account_id, user_id, cbu, balance, currency )
VALUES (
'204878658',
'2',
'01702046600000087865',
'0',
'ARS'
) ;


INSERT INTO transfers (origin_account, destiny_account, value, remaining_balance)
VALUES (
'1',
'2',
'500',
'-500'
) ;

UPDATE accounts
SET pin = "1234"
WHERE user_id = "2" AND account_id = "100000000012";

 */
