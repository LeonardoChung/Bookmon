import {db} from "../db.js"

export const getPosts = (_, res) => {
    const q = `SELECT u.username, post.content
	FROM posts post
    JOIN users u
    WHERE u.idusers = post.iduser
    ORDER BY idposts DESC`; // posts mais recentes
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.status(200).json(data);
    });
}