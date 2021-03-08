import logo from './images/guacamole-logo.png';
import './App.css';
import NavBar from './components/NavBar/NavBar'
import ItemListContainer from './components/ItemListContainer/ItemListContainer'


function App() {
  return (
    <>
      <NavBar />
      <div id="main">
        <img id="logo" src={logo} alt="logo"/>
        <ItemListContainer greeting='¡COMPRÁ ONLINE Y RECIBÍ TU PRODUCTO DONDE QUIERAS!'/>
      </div>
    </>
  );
}

export default App;
