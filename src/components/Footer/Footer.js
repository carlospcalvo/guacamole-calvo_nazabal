import {Link} from 'react-router-dom'
import { FaFacebookSquare, FaInstagram, FaRegEnvelope } from 'react-icons/fa'
import './Footer.css'

const Footer = () => {

    return (
        <footer className="navbar-fixed-bottom">
            <div className="container">
                <div className="left-footer">
                    &copy;{new Date().getFullYear()} Guacamole - Todos los derechos reservados
                </div>
                <div className="right-footer">
                    <div id="fb-link">
                        <FaFacebookSquare style={{marginTop: ".15rem", marginRight: ".5rem"}}/>
                        <Link to={{ pathname: 'https://www.facebook.com/GuacamoleChicos'}} target="_blank" style={{textDecoration: "none", textTransform: "none", color: "white"}}> @GuacamoleChicos</Link> 
                    </div>
                    <div id="ig-link">
                        <FaInstagram style={{marginTop: ".15rem", marginRight: ".5rem"}}/>
                        <Link to={{ pathname: "https://www.instagram.com/guacamolechicos/" }} target="_blank" style={{textDecoration: "none", textTransform: "none", color: "white"}}> @guacamolechicos</Link>
                    </div>
                    <div id="mail-link">
                        <FaRegEnvelope style={{marginTop: ".15rem", marginRight: ".5rem"}}/>
                        <Link to={{ pathname: "mailto:guacamolechicos@gmail.com" }} target="_blank" style={{textDecoration: "none", textTransform: "none", color: "white"}}> guacamolechicos@gmail.com</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer