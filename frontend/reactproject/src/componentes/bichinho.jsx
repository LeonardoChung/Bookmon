import "../css/bichinho.css";
import React, { useEffect, useState } from 'react';
import { getBichinho, feedBichinho} from './api';
import { useParams } from 'react-router-dom';

function Bichinho(){

    const [pet, setBichinho] = useState(null);
    const { id } = useParams();

    const loadBichinho = async () => {
        const data = await getBichinho(id);
        setBichinho(data);
    };

    useEffect(() => {
        loadBichinho();
    }, []);

    const handleFeed = async (food) => {
    try {
        const data = await feedBichinho(id, food);
        setBichinho(data);
    } catch (err) {
        alert('Você não tem pontos suficientes!');
    }
    };

    if (!pet) return <p>Carregando...</p>;

    const getGifByNivel = (nivel) => {
    if (nivel == 2) return "/gifs/patinho2.gif";
    if (nivel == 3) return "/gifs/patinho3.gif";
    if (nivel == 4) return "/gifs/patinho4.gif";
    if (nivel == 5) return "/gifs/patinho5.gif";
    if (nivel == 6) return "/gifs/patinho6.gif";
    if (nivel == 7) return "/gifs/patinho7.gif";
    if (nivel == 8) return "/gifs/patinho8.gif";
    if (nivel == 9) return "/gifs/patinho9.gif";
    if (nivel == 10) return "/gifs/patinho10.gif";
    if (nivel == 11) return "/gifs/patinho11.gif";
    if (nivel == 12) return "/gifs/patinho12.gif";
    if (nivel == 13) return "/gifs/patinho13.gif";
    if (nivel == 14) return "/gifs/patinho14.gif";
    if (nivel >= 15) return "/gifs/patinho15.gif";

    
    return "/gifs/patinho1.gif";
    };

    return(
        <div>
            <div className="body">
                <h1>Seu Quackito Virtual</h1>
                <img src={getGifByNivel(pet.nivel)} alt="Bichinho" style={{ width: '200px' }} />

                <div className="bichinho-status">
                    <p>Nível: {pet.nivel}</p>
                    <p>Pontos: {pet.level_points} / 50</p>
                    <p>Pontuação disponível: {pet.pontuacao}</p>
                </div>


                <div className="feed-bichinho">
                    <h1>Escolha a comida:</h1>
                    <div className="buttons">
                        <button className="bichinho-button" onClick={() => handleFeed('ração')}>Ração 🐾 (+10)</button>
                        <button className="bichinho-button" onClick={() => handleFeed('fruta')}>Fruta 🍎 (+15)</button>
                        <button className="bichinho-button" onClick={() => handleFeed('carne')}>Carne 🍖 (+25)</button>
                        <button className="bichinho-button" onClick={() => handleFeed('doce')}>Doce 🍩 (+5)</button>
                    </div>
                    
                </div>
            </div>

        </div>

        
    )
    
    
}

export default Bichinho;
