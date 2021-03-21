import React from 'react';
import { Nav, Navbar, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import {FaSearch} from 'react-icons/fa'
import CartWidget from '../CartWidget/CartWidget'
import './NavBar.css'


const NavBar = () => (
  <Navbar id='navbar' expand="xl" variant="dark">
    <Nav.Link id="inicio" href="/">Inicio</Nav.Link>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <NavDropdown className="NavDropDown" title="Productos" id="basic-nav-dropdown">
          <NavDropdown.Item href="/">Todos los productos</NavDropdown.Item>
          <NavDropdown.Item href="/category/nenas">Nenas</NavDropdown.Item>
          <NavDropdown.Item href="/category/pre-teens">Pre Teens</NavDropdown.Item>
          <NavDropdown.Item href="/category/chiquititas">Chiquititas</NavDropdown.Item>
          <NavDropdown.Item href="/category/varones">Varones</NavDropdown.Item>
          <NavDropdown.Item href="/sale">Sale</NavDropdown.Item>
        </NavDropdown>
        <Nav.Link href="/sale">Sale</Nav.Link>
        <Nav.Link href="/ayuda">Cómo comprar</Nav.Link>
        <Nav.Link href="/tabla-de-talles">Tabla de talles</Nav.Link>
        <Nav.Link href="/preguntas-frecuentes">Preguntas Frecuentes</Nav.Link>
        <Nav.Link href="/ventas-mayoristas">Ventas Mayoristas</Nav.Link>        
        <Nav.Link href="/quienes-somos">Quiénes somos</Nav.Link>
        <Nav.Link href="/contacto">Contacto</Nav.Link>
      </Nav>
      <Nav id='nav-right'>
        <Form id='navbar-search' inline>
          <FormControl type="text" size="sm" placeholder="Buscar..." className="mr-sm-2" />
          <Button size="sm" variant="light">
            <FaSearch style={{color: '#c0392b'}}/>  
          </Button>       
        </Form>
        <CartWidget backgroundColor='#c0392b' borderColor='#c0392b'/> 
      </Nav>      
    </Navbar.Collapse>
  </Navbar>
)

export default NavBar

