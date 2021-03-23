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
                        <a href='https://www.facebook.com/GuacamoleChicos' style={{textDecoration: "none", textTransform: "none", color: "white"}}> @GuacamoleChicos</a> 
                    </div>
                    <div id="ig-link">
                        <FaInstagram style={{marginTop: ".15rem", marginRight: ".5rem"}}/>
                        <a href="https://www.instagram.com/guacamolechicos/" style={{textDecoration: "none", textTransform: "none", color: "white"}}> @guacamolechicos</a>
                    </div>
                    <div id="mail-link">
                        <FaRegEnvelope style={{marginTop: ".15rem", marginRight: ".5rem"}}/>
                        <a href="mailto:guacamolechicos@gmail.com" style={{textDecoration: "none", textTransform: "none", color: "white"}}> guacamolechicos@gmail.com</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer