import { Link, useNavigate  } from "react-router-dom";
import { useRef, useState } from "react";
import logo from "../images/logo.png";
import iconMenu from "../images/icon-menu.png";
import "../css/header.css";

function Header() {
    const navbarRef = useRef(null);
    const [menuAberto, setMenuAberto] = useState(false);
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");

    function showMenu() {
        if (navbarRef.current) {
            navbarRef.current.style.width = menuAberto ? '1px' : '250px';
            navbarRef.current.style.transition = '1s';
            setMenuAberto(!menuAberto);
        }
    }

    function handleLogout() {
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <div className="header">
            <nav className="navbar" ref={navbarRef}>
                <ul className="top_lista">
                    <li className="item-menu">
                        <Link className="link" to="/home">Home</Link>
                    </li>
                </ul>
                <ul>
                    <li className="item-menu">
                        <Link className="link" to={`/user/${userId}`}>Perfil</Link>
                    </li>
                </ul>
                <ul>
                    <li className="item-menu">
                        <Link className="link" to={`/leituras/${userId}`}>Leituras</Link>
                    </li>
                </ul>
                <ul>
                    <li className="item-menu">
                        <Link className="link" to={`/feed/${userId}`}>Feed</Link>
                    </li>
                </ul>
                <ul>
                    <li className="item-menu">
                        <Link className="link" to={`/bichinho/${userId}`}>Quackito virtual</Link>
                    </li>
                </ul>
                <ul>
                    <li className="item-menu">
                        <span className="link" onClick={handleLogout} style={{ cursor: "pointer" }}>Sair</span>
                    </li>
                </ul>
            </nav>

            <div className="logo">
                <Link className="link" to="/home">
                    <img src={logo} alt="Logo" className="logo-img" />
                </Link>
            </div>

            <div className="menu">
                <img
                    src={iconMenu}
                    alt="Abrir menu"
                    className="icon-menu-img"
                    onClick={showMenu}
                    style={{ cursor: "pointer" }}
                />
            </div>
        </div>
    );
}

export default Header;
