import Header from "./header.jsx";
import { Link } from "react-router-dom";

function Home(){

    return(
        <div className="geral">
        
        <Header />

        <div className="body">

            <div className="book">

                <div className="feed"><Link className="link" to="/feed">Feed</Link></div>
                <div className="user"><Link className="link" to="/user">User</Link></div>
                <div className="bichinho"><Link className="link" to="/bichinho">Bichinho</Link></div>

            </div>
   
        </div>

    </div>
    )
    

    
}

export default Home;
