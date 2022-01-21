import AddFly from "../components/AddFly"
import Button from "../components/Button"
import FlyDisplay from "../components/FlyDisplay/FlyDisplay"
import { useEffect, useState } from "react"

const FliesPage = () => {
    const [flies, setFlies] = useState([])

    useEffect(() => {
        const fetchFlies = async () => {
          const res = await fetch(process.env.REACT_APP_API_URL + '/flies', {
            credentials: 'include'
          })
          const data = await res.json()

          setFlies(data)
        }

        fetchFlies()
      }, [])


      const addFly = async (fly) => {
        console.log("posting")
        const res = await fetch(process.env.REACT_APP_API_URL + 'flies', {
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

    return(
            <div className="fly-grid rounded-box styled-scrollbar" style={{height: "calc(100%)",
              overflowY: "scroll"}}>
              {flies.map((f) => (<FlyDisplay key={f.id} fly={f}/>))}
            </div>

            // {/* <AddFly onAdd={addFly}/> */}
    )
}

export default FliesPage