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

function getFriendshipStatus(user1, user2) {
    const q = `SELECT sender_id, recipient_id, accepted FROM friendships 
            WHERE (recipient_id = $1 AND sender_id = $2) 
            OR (recipient_id = $2 AND sender_id = $1);`;
    const params = [user1, user2];
    return db.query(q, params);
}

function makeFriendRequest(sender, recipient) {
    const q = `INSERT INTO friendships (sender_id, recipient_id)
            VALUES ($1, $2)
            RETURNING accepted;`;
    const params = [sender, recipient];
    return db.query(q, params);
}

function acceptFriendRequest(acceptor, acceptee) {
    const q = `UPDATE friendships
            SET accepted = true
            WHERE (recipient_id = $1 AND sender_id = $2)
            RETURNING accepted;`;
    const params = [acceptor, acceptee];
    return db.query(q, params);
}

function cancelFriendRequestOrEndFriendShip(user1, user2) {
    const q = `DELETE FROM friendships
            WHERE (recipient_id = $1 AND sender_id = $2) 
            OR (recipient_id = $2 AND sender_id = $1);`;
    const params = [user1, user2];
    return db.query(q, params);
}

function getFriendsByUserId(userId) {
    const q = `WITH matches AS (
                SELECT sender_id, recipient_id
                FROM friendships 
                WHERE recipient_id = $1 OR sender_id = $1
                AND accepted
            ),
            filtered_matches AS (
                SELECT 
                    CASE
                        WHEN sender_id = $1
                            THEN recipient_id
                        ELSE sender_id
                    END AS match_id
                FROM matches
            )
            SELECT users.id, users.first, users.last, users.image_url
            FROM filtered_matches 
            JOIN users
            ON filtered_matches.match_id = users.id;`;
    const params = [userId];
    return db.query(q, params);
}

function getFriendsAndRequestsByUserId(userId) {
    const q = `SELECT users.id, users.first, users.last, users.image_url, accepted
            FROM friendships
            JOIN users ON (accepted = false AND recipient_id = $1 AND sender_id = users.id) OR
                          (accepted AND recipient_id = $1 AND sender_id = users.id) OR
                          (accepted AND recipient_id = users.id AND sender_id = $1);`;
    const params = [userId];
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
    getFriendshipStatus,
    makeFriendRequest,
    acceptFriendRequest,
    cancelFriendRequestOrEndFriendShip,
    getFriendsByUserId,
    getFriendsAndRequestsByUserId,
};
