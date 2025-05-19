import Header from "./header.jsx";
import book from "../images/book.webp";
import quackitoWave from "../images/quackito_wave.gif";
import exampleUser from "../images/example-user.png";
import "../css/home.css";
import { Link } from "react-router-dom";

function Home(){


    return(
        <div className="geral">
        
        <Header />

        <div className="body">

            <div className="book">

                <img src={book} alt="Book" className="book-img" />

                <div className="feed">
                    <Link className="link" to="/feed">
                        <div className="baloon">O que será que os outros estão lendo?</div>
                    </Link>
                </div>
                <div className="user">
                    <Link className="link" to="/user">
                        <img src={exampleUser} alt="User" className="exampleUser-img" />
                    </Link>
                </div>
                <div className="bichinho">
                    <p>Bem-vindo, leitor!</p>
                    <p>Vamos ler?</p>
                    <Link className="link" to="/bichinho">
                        <img src={quackitoWave} alt="Quackito" className="quackito-img" />
                    </Link>
                </div>

            </div>
   
        </div>

    </div>
    )
    

    
}

export default Home;
