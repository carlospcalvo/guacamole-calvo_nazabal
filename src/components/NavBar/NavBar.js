import React from 'react';
import { Nav, Navbar, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom'
import {FaSearch} from 'react-icons/fa'
import CartWidget from '../CartWidget/CartWidget'
import {useCartContext} from '../../context/cartContext'
import './NavBar.css'

const NavBar = () => {
  let {cartSize} = useCartContext()


  //HACER EL NAVBAR DINAMICO CON UN JSON
  
  return (
    <Navbar id='navbar' expand="xl" variant="dark">
      <Nav.Link as={Link} id="inicio" to="/">Inicio</Nav.Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavDropdown className="NavDropDown" title="Productos" id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} to="/">Todos los productos</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/category/nenas">Nenas</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/category/pre-teens">Pre Teens</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/category/chiquititas">Chiquititas</NavDropdown.Item>
            {/* TODAVIA NO HAY MATERIAL <NavDropdown.Item as={Link} to="/category/varones">Varones</NavDropdown.Item> */}
            <NavDropdown.Item as={Link} to="/sale">Sale</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link as={Link} to="/sale">Sale</Nav.Link>
          <Nav.Link as={Link} to="/ayuda">Cómo comprar</Nav.Link>
          <Nav.Link as={Link} to="/tabla-de-talles">Tabla de talles</Nav.Link>
          <Nav.Link as={Link} to="/preguntas-frecuentes">Preguntas Frecuentes</Nav.Link>
          <Nav.Link as={Link} to="/ventas-mayoristas">Ventas Mayoristas</Nav.Link>        
          <Nav.Link as={Link} to="/quienes-somos">Quiénes somos</Nav.Link>
          <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>
        </Nav>
        <Nav id='nav-right'>
          <Form id='navbar-search' inline>
            <FormControl type="text" size="sm" placeholder="Buscar..." className="mr-sm-2" />
            <Button size="sm" variant="light">
              <FaSearch style={{color: '#c0392b'}}/>  
            </Button>       
          </Form>
          { cartSize > 0 && <CartWidget backgroundColor='#c0392b' borderColor='#c0392b'/> }
        </Nav>      
      </Navbar.Collapse>
    </Navbar>
  )

}  

export default NavBar

