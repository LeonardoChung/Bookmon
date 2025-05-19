import {db} from "../db.js"

export const updateBichinho = (req, res) => {
    const q = "UPDATE bicho SET idbicho = ?, iduser = ?, level = ?, points = ? WHERE idbicho = ?";
    db.query(q, [req.body.idbicho, req.body.iduser, req.body.level, req.body.points, req.body.id], (err, data) => {
        if (err) return res.json(err);
        return res.status(200).json({message: "Bicho atualizado com sucesso"});
    });
}
