import {db} from "../db.js"

export const createPost = (req, res) => {
    const q = "INSERT INTO posts (idposts, iduser, datetime, content) VALUES (?, ?, ?, ?)";
    db.query(q, [req.body.idposts, req.body.id, req.body.datetime, req.body.content], (err, data) => {
        if (err) return res.json(err);
        return res.status(200).json({message: "Post realizado com sucesso"});
    });
}

export const getPosts = (req, res) => {
    const q = "SELECT * FROM posts WHERE iduser = ?"; // sort by datetime??
    db.query(q, [req.body.id], (err, data) => {
        if (err) return res.json(err);
        return res.status(200).json(data);
    });
}
