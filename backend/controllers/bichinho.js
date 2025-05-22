import { db } from "../db.js";

export const getBichinho = (req, res) => {
    const q = `
        SELECT level AS nivel,
               points AS pontuacao,
               level_points AS level_points
        FROM bicho
        WHERE iduser = ?
        LIMIT 1;
    `;

    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json({ message: "Bichinho não encontrado" });
        return res.status(200).json(data[0]);
    });
};

export const updateBichinho = (req, res) => {
    const { pontosGanhos, custo } = req.body;
    const userId = req.params.id;

    const selectQuery = "SELECT * FROM bicho WHERE iduser = ?";

    db.query(selectQuery, [userId], (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.length === 0) return res.status(404).json({ message: "Bichinho não encontrado" });

        let { points, level_points, level } = result[0];

        if (points < custo) {
            return res.status(403).json({ message: "Pontuação insuficiente" });
        }

        level_points += pontosGanhos;

        while (level_points >= 50) {
            level_points -= 50;
            level += 1;
        }

        const updateQuery = `
            UPDATE bicho
            SET level = ?, level_points = ?, points = points - ?
            WHERE iduser = ?
        `;

        db.query(updateQuery, [level, level_points, custo, userId], (err2) => {
            if (err2) return res.status(500).json(err2);

            db.query(selectQuery, [userId], (err3, updated) => {
                if (err3) return res.status(500).json(err3);
                const { level, points: pontuacao, level_points } = updated[0];
                return res.status(200).json({
                    nivel: level,
                    pontuacao: pontuacao,
                    level_points: level_points
                });
            });
        });
    });
};

