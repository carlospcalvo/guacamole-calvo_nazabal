import NavBar from './components/NavBar/NavBar'
//import ItemListContainer from './components/ItemListContainer/ItemListContainer'
//import logo from './images/guacamole-logo.png';
import './styles/App.css';

// SOLO PARA LA ENTREGA RENDERIZAR ItemDetailContainer EN App 
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer'

function App() {
  return (
    <>
      <NavBar />
      <div id="main">
        {/* <img id="logo" src={logo} alt="logo"/>
        <ItemListContainer greeting='¡COMPRÁ ONLINE Y RECIBÍ TU PRODUCTO DONDE QUIERAS!'/> */}
        <ItemDetailContainer />
      </div>
    </>
  );
}

export default App;
