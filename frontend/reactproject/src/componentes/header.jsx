import { Link } from "react-router-dom";

function Header() {

    return(
        <div className="header">

            <div className="logo">
                <Link className="link" to="/">Home</Link>
                
            </div>
            <div className="menu"></div>

        </div>
    )

    
}

export default Header;
