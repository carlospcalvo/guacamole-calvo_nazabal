import {useContext} from 'react'
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer'
import Footer from './components/Footer/Footer'
import {CartContext, CartContextProvider, useCartContext} from './context/cartContext'
import './styles/App.css'

const App = () => {
  const context = useCartContext()

  console.log(context)
  return (
    <>
      <Router>
        <NavBar/>
        <div id="main">
          <Switch>
            <Route path="/item/:id">
              <ItemDetailContainer /> 
            </Route>
            <Route path="/category/:categoryId">
                <ItemListContainer /> 
            </Route>
            <Route path="/quienes-somos">
              <h1>Quiénes somos</h1>
            </Route>
            <Route path="/ventas-mayoristas">
              <h1>Ventas Mayoristas</h1>
            </Route>
            <Route path="/preguntas-frecuentes">
              <h1>Preguntas frecuentes</h1>
            </Route>
            <Route path="/ayuda">
              <h1>Cómo comprar</h1>
            </Route>
            <Route path="/tabla-de-talles">
              <h1>Tabla de talles</h1>
            </Route>
            <Route path="/sale">
              <h1>Sale</h1>
            </Route>
            <Route path="/contacto">
              <h1>Contacto</h1>
            </Route>
            <CartContextProvider>
              <Route exact path="/cart">
                <Cart/>
              </Route>
            </CartContextProvider>
            
            <Route exact path="/"> 
              <ItemListContainer greeting='¡COMPRÁ ONLINE Y RECIBÍ TU PRODUCTO DONDE QUIERAS!'/>
            </Route>
          </Switch>
        </div>
        <Footer/>
      </Router> 
    </>
  );
}

const Cart = () => {
  const {name, setName} = useCartContext()

  return(
    <>
      <h3>Name : {name}</h3>
      <button onClick={()=>setName(name === "test" ? "hola" : "test")} >Click me</button>
    </>
  )
}


export default App;
