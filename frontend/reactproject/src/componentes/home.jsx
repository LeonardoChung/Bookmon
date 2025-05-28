import book from "../images/book.webp";
import quackitoWave from "../images/quackito_wave.gif";
import exampleUser from "../images/example-user.png";
import flecha1 from "../images/seta-curva.png";
import flecha2 from "../images/seta-curva 2.png";
import flecha3 from "../images/seta-curva 3.png";
import "../css/home.css";
import { Link } from "react-router-dom";

function Home() {
    const userId = localStorage.getItem("userId");


    return (
        <div className="geral">
            <div className="home-body">

                <div className="home-left">
                    <div className="item-left">
                        <div className="item-text">Acesse seu feed</div>
                        <img src={flecha2} alt="flecha2" className="flecha2" />
                    </div>
                    <div className="item-left">
                        <div className="item-text">Acesse seu perfil</div>
                        <img src={flecha3} alt="flecha3" className="flecha3" />
                    </div>

                </div>

                <div className="book">

                    <img src={book} alt="Book" className="book-img" />

                    <div className="feed">
                        <Link className="link" to={`/feed/${userId}`}>
                            <div className="baloon">O que será que os outros estão lendo?</div>
                        </Link>
                    </div>
                    <div className="user">
                        <Link className="link" to={`/user/${userId}`}>
                            <img src={exampleUser} alt="User" className="exampleUser-img" />
                        </Link>
                    </div>
                    <div className="bichinho">
                        <p>Bem-vindo, leitor!</p>
                        <p>Vamos ler?</p>
                        <Link className="link" to={`/bichinho/${userId}`}>
                            <img src={quackitoWave} alt="Quackito" className="quackito-img" />
                        </Link>
                    </div>

                </div>

                <div className="home-right">
                    <div className="item-right">
                        <img src={flecha1} alt="flecha1" className="flecha1" />
                        <div className="item-text">Acesse seu Quackito virtual</div>

                    </div>
                </div>

            </div>

        </div>
    )



}

export default Home;
