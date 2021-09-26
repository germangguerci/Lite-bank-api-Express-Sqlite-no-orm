export const CREATE_USERS_TABLE = `CREATE TABLE IF NOT EXISTS users  (
user_id INTEGER PRIMARY KEY AUTOINCREMENT,
full_name TEXT NOT NULL,
date_of_birth REAL NOT NULL,
dni TEXT NOT NULL UNIQUE,
phone TEXT,
email TEXT NOT NULL,
username TEXT NOT NULL UNIQUE,
password TEXT NOT NULL,
created_at REAL DEFAULT (julianday('now')),
updated_at REAL
)`;

export const CREATE_ACCOUNTS_TABLE = `CREATE TABLE IF NOT EXISTS accounts (
account_id INTEGER PRIMARY KEY UNIQUE NOT NULL,
user_id INTEGER,
cbu TEXT NOT NULL,
balance INTEGER NOT NULL,
currency TEXT NOT NULL,
pin INTEGER DEFAULT '0',
created_at REAL DEFAULT (julianday('now')),
updated_at REAL,
FOREIGN KEY(user_id) REFERENCES users(user_id)
);`;

export const CREATE_TRANSFERS_TABLE = `CREATE TABLE IF NOT EXISTS transfers (
order_id INTEGER PRIMARY KEY AUTOINCREMENT,
origin_account INTEGER NOT NULL,
destiny_account INTEGER NOT NULL,
value INTEGER NOT NULL,
created_at REAL DEFAULT (julianday('now')),
remaining_balance INTEGER NOT NULL,
status TEXT NOT NULL DEFAULT pending,
FOREIGN KEY(origin_account) REFERENCES accounts(account_id),
FOREIGN KEY(destiny_account) REFERENCES users(account_id)
);`;

export const CREATE_DEPOSITS_TABLE = `CREATE TABLE IF NOT EXISTS deposits (
deposit_id INTEGER PRIMARY KEY,
account_id INTEGER,
created_at REAL DEFAULT (julianday('now')),
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
 */
