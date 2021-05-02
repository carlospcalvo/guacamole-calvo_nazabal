import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer'
import Footer from './components/Footer/Footer'
import Cart from './components/Cart/Cart'
import Checkout from './components/Checkout/Checkout'
import OrderDetail from './components/OrderDetail/OrderDetail'
import SignUp from './components/SignUp/SignUp'
import Login from './components/Login/Login'
import PasswordReset from './components/PasswordReset/PasswordReset'
import Profile from './components/Profile/Profile'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import {CartContextProvider} from './context/cartContext'
import {AuthProvider} from './context/AuthContext'
import './styles/App.css'


const App = () => {
  return (
    <>
      <CartContextProvider>
        <AuthProvider>
          <Router>
            <NavBar/>
            <section id="main">
              <Switch>
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

                <Route exact path="/recover-password" component={PasswordReset} />
                <PrivateRoute exact path="/perfil" component={Profile} />
                <PrivateRoute exact path="/order/:id" component={OrderDetail} />
                <PrivateRoute exact path="/checkout" component={Checkout} />
                <Route exact path="/registrate" component={SignUp}/>
                <Route exact path="/login" component={Login} />
                <Route exact path="/item/:id" component={ItemDetailContainer}/> 
                <Route exact path="/category/:categoryId" component={ItemListContainer}/> 
                <Route exact path="/cart" component={Cart}/>         
                <Route exact path="/"> 
                  <ItemListContainer greeting='¡COMPRÁ ONLINE Y RECIBÍ TU PRODUCTO DONDE QUIERAS!'/>
                </Route>
              </Switch>
            </section>
            <Footer/>
          </Router> 
        </AuthProvider>
      </CartContextProvider>
    </>
  );
}

export default App;
