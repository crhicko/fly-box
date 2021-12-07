import './App.css';
import Header from './components/Header/Header'
import MenuBar from './components/MenuBar/MenuBar';
import Button from './components/Button'

function App() {
  return (
    <div className="App">
      <Header ></Header>
      <MenuBar></MenuBar>
      <Button onClick={() => {
        console.log("beans")
      }}></Button>
    </div>
  );
}

export default App;
