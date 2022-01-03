import AddFly from "../components/AddFly"
import Button from "../components/Button"
import FlyDisplay from "../components/FlyDisplay/FlyDisplay"
import { useEffect, useState } from "react"

const FliesPage = () => {
    const [flies, setFlies] = useState([])

    useEffect(() => {
        const fetchFlies = async () => {
          const res = await fetch('http://localhost:4000/flies', {
            credentials: 'include'
          })
          const data = await res.json()

          setFlies(data)
        }

        fetchFlies()
      }, [])


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

      const getUser = async() => {
        console.log("getting user")
        const res = await fetch('http://localhost:4000/user', {credentials:  'include'});
        const data = await res.json();

        console.log(data)
      }

    return(
        <div>
            <h1> This is the flies page </h1>
            <img className="logo" src="../public/logo.svg" alt="logo"/>

            <Button onClick={() => {
            getUser()
            }}/>

            <div className="FlyFlex">
            {flies.map((f) => (<FlyDisplay key={f.id} fly={f}/>))}
            </div>

            <Button onClick={() => {
            console.log("beans")
            }}></Button>

            <AddFly onAdd={addFly}/>
        </div>
    )
}

export default FliesPage