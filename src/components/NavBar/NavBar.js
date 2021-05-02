import {useState, useEffect} from 'react';
import { Nav, Navbar, NavDropdown, Form, FormControl, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import {Link, useHistory} from 'react-router-dom'
import {FaSearch, FaUserAlt} from 'react-icons/fa'
import CartWidget from '../CartWidget/CartWidget'
import {useAuth} from '../../context/AuthContext'
import {getFirestore} from '../../config/firebase'
import './NavBar.css'

const NavBar = () => {
  //Auth
  const {currentUser, logout} = useAuth()
  
  //Location
  const history = useHistory()

  //State
  const [categories, setCategories] = useState([]);

  //Effect
  useEffect(() => {
    const db = getFirestore()
    const categoryCollection = db.collection('categories')

    categoryCollection.get()
    .then((querySnapshot) => {
        if(querySnapshot.size !== 0){
            setCategories(querySnapshot.docs.map(doc => doc.data()))
        } else {
            console.log("[Categories] No categories ")
        }        
    })
    .catch((err) => {
        console.log("[Categories] Error searching categories ", err)
    })

  }, []);

  //Helpers
  const handleLogout = async () => {
    try{
      await logout()
      history.push('/login')
    }  catch {
      console.log("User could not log out.")
    }
  } 
  
  return (
    <Navbar id='navbar' expand="xl" variant="dark">
      <Nav.Link as={Link} id="inicio" to="/">Inicio</Nav.Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavDropdown className="NavDropDown" title="Productos" id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} to="/">Todos los productos</NavDropdown.Item>
            {
              categories ? categories.map((category, i) => <NavDropdown.Item as={Link} to={`/category/${category.key}`} key={i}>{category.description}</NavDropdown.Item>) : null
            }
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

          <DropdownButton
            menuAlign="left"
            title={<FaUserAlt style={{color: 'white', verticalAlign: "middle"}}/>}
            variant="light" 
            id="ProfileMenu"
          >
              {
                currentUser ? 
                <>
                  <Dropdown.ItemText style={{color:"white", textTransform:"none", fontStyle: "italic"}}>{currentUser.email}</Dropdown.ItemText>
                  <Dropdown.Item as={Link} to={{pathname: "/perfil", state: { target: 'compras' }}}>Mi perfil</Dropdown.Item>
                  <Dropdown.Item as={Link} to={{pathname: "/perfil", state: { target: 'favoritos' }}}>Favoritos</Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>Salir</Dropdown.Item>
                </>
                :
                <Dropdown.Item as={Link} to="/login">Ingresar</Dropdown.Item>
              }
          </DropdownButton>
          <Form id='navbar-search' inline>
            <FormControl type="text" size="sm" placeholder="Buscar..." className="mr-sm-2" style={{borderRadius: "2rem"}} />
            <Button size="sm" variant="light">
              <FaSearch style={{color: '#c0392b', paddingBottom: ".1rem"}}/>  
            </Button>       
          </Form>
          <CartWidget backgroundColor='#c0392b' borderColor='#c0392b'/>
        </Nav>      
      </Navbar.Collapse>
    </Navbar>
  )

}  

export default NavBar

