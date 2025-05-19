import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import "../css/header.css";

function Header() {

    return(
        <div className="header">

            <div className="logo">
                <Link className="link" to="/">
                    <img src={logo} alt="Logo" className="logo-img" />
                </Link>
                
            </div>
            <div className="menu"></div>

        </div>
    )

    
}

export default Header;
