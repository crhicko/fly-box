import './App.css';
import Header from './components/Header/Header'
import MenuBar from './components/MenuBar/MenuBar';
import Button from './components/Button'
import FlyDisplay from './components/FlyDisplay/FlyDisplay'
import {useEffect, useState} from 'react'
import AddFly from './components/AddFly'

function App() {

    const [flies, setFlies] = useState([])

    const addFly = async (fly) => {
      console.log("posting")
      const res = await fetch('http://localhost:4000/flies', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(fly)
      });
      const data = await res.json();

      console.log(data)
    }

    useEffect(() => {
      const fetchFlies = async () => {
        const res = await fetch('http://localhost:4000/flies')
        const data = await res.json()

        setFlies(data)
      }

      fetchFlies()
    }, [])

  return (
    <div className="App">
      <Header ></Header>
      <MenuBar></MenuBar>
      {console.log(flies)}
      {console.log(typeof(flies))}
      <div className="FlyFlex">
        {flies.map((f) => (<FlyDisplay key={f.id} fly={f}/>))}
      </div>
      <Button onClick={() => {
        console.log("beans")
      }}></Button>
      <AddFly onAdd={addFly}/>
    </div>
  );
}

export default App;
