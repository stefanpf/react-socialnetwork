let DATABASE, DB_USERNAME, DB_PASSWORD;
if (!(process.env.NODE_ENV == "production")) {
    DATABASE = require("../../secrets").DATABASE;
    DB_USERNAME = require("../../secrets").DB_USERNAME;
    DB_PASSWORD = require("../../secrets").DB_PASSWORD;
}

const psql = require("spiced-pg");

const db = psql(
    process.env.DATABASE_URL ||
        `postgres:${DB_USERNAME}:${DB_PASSWORD}@localhost:5432/${DATABASE}`
);

console.log(`[db] connecting to: ${DATABASE}`);

function addUser(firstName, lastName, email, hashedPw) {
    const q = `INSERT INTO users (first, last, email, password)
            VALUES ($1, $2, $3, $4) RETURNING id`;
    const params = [firstName, lastName, email, hashedPw];
    return db.query(q, params);
}

function getUserByEmail(email) {
    const q = `SELECT id, password FROM users WHERE email = $1;`;
    const params = [email];
    return db.query(q, params);
}

function getUserById(id) {
    const q = `SELECT first, last, email, image_url, bio FROM users WHERE id = $1;`;
    const params = [id];
    return db.query(q, params);
}

function getUsersByName(name) {
    const q = `SELECT id, first, last, image_url 
            FROM users 
            WHERE first ILIKE $1 OR last ILIKE $1;`;
    const params = [`${name}%`];
    return db.query(q, params);
}

function getNewestUsers() {
    return db.query(`SELECT id, first, last, image_url
            FROM users
            ORDER BY id DESC
            LIMIT 3;`);
}

function addImageUrl(id, url) {
    const q = `UPDATE users
            SET image_url = $2
            WHERE id = $1;`;
    const params = [id, url];
    return db.query(q, params);
}

function getUserBio(id) {
    const q = `SELECT bio FROM users
            WHERE id = $1;`;
    const params = [id];
    return db.query(q, params);
}

function addUserBio(id, bio) {
    const q = `UPDATE users
            SET bio = $2
            WHERE id = $1;`;
    const params = [id, bio];
    return db.query(q, params);
}

function setResetCode(email, code) {
    const q = `INSERT INTO password_reset_codes (email, code)
            VALUES ($1, $2)
            ON CONFLICT (email)
            DO UPDATE SET code = $2, created_at = CURRENT_TIMESTAMP
            RETURNING code;`;
    const params = [email, code];
    return db.query(q, params);
}

function getResetCode(email) {
    const q = `SELECT code FROM password_reset_codes 
            WHERE email = $1
            AND CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes';`;
    const params = [email];
    return db.query(q, params);
}

function updatePassword(email, password) {
    const q = `UPDATE users
        SET password = $2
        WHERE email = $1;`;
    const params = [email, password];
    return db.query(q, params);
}

module.exports = {
    addUser,
    getUserByEmail,
    getUserById,
    getUsersByName,
    getNewestUsers,
    addImageUrl,
    getUserBio,
    addUserBio,
    setResetCode,
    getResetCode,
    updatePassword,
};
