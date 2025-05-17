import Header from "./header.jsx";
import React, { useEffect, useState } from 'react';
import { getBichinho, feedBichinho} from './api';

function Bichinho(){

    const [pet, setBichinho] = useState(null);

    const loadBichinho = async () => {
        const data = await getBichinho();
        setBichinho(data);
    };

    useEffect(() => {
        loadBichinho();
    }, []);

    const handleFeed = async (food) => {
    try {
        const data = await feedBichinho(food);
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

        <Header/>

        <h2>Seu Pet Virtual 🐾</h2>
        <img src={getGifByNivel(pet.nivel)} alt="Bichinho" style={{ width: '200px' }} />

        <p>Nível: {pet.nivel}</p>
        <p>Pontos: {pet.pontos} / 50</p>

        <p>Pontuação disponível: {pet.pontuacao}</p>

        <div>
        <h3>🍽 Escolha a comida</h3>
        <button onClick={() => handleFeed('ração')}>Ração 🐾 (+10)</button>
        <button onClick={() => handleFeed('fruta')}>Fruta 🍎 (+15)</button>
        <button onClick={() => handleFeed('carne')}>Carne 🍖 (+25)</button>
        <button onClick={() => handleFeed('doce')}>Doce 🍩 (+5)</button>
        </div>

        </div>

        
    )
    
    
}

export default Bichinho;
