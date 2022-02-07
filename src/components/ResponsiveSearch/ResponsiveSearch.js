import './ResponsiveSearch.css'
import { useState, useCallback, useEffect, useRef } from 'react'
import useDidUpdateEffect from '../../util/useDidUpdateEffect'



const ResponsiveSearch = ({}) => {

    // const controller = useRef(new AbortController())

    const getSearchResults = async (text) => {

        const controller = new AbortController()
        if(activeAbortController.current !== null) {
            console.log("Aborting the request", activeAbortController.current)
            activeAbortController.current.abort()
        }   
        activeAbortController.current = controller
        
        console.log("Call to get search results")
        try {
            const res = await fetch(process.env.REACT_APP_API_URL + '/flies?search=' + text, {
                method: 'GET',
                signal: controller.signal
            })
            console.log(res)
            console.log(controller)
            if(res.body) {
                const data = await res.json() 
                console.log(data)
                setSearchResults(data)
            }
        }
        catch(err) {
            if(err && err.name === 'AbortError')
                console.log(err)
        }
        activeAbortController.current = null
    }

    const [search, setSearch] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const activeAbortController = useRef(null)
    const apiCallCB = useCallback(debounce(getSearchResults), [])

    const updateSearch = (text) => {
        setSearch(text)
    }

    useDidUpdateEffect(() => {
        apiCallCB(search)
    }, [search])



    //make a api call that can be aborted to return the 5 closest flies to the search query
    //abort on a change to the search text
    //send api call upon debounce
    //Debounce: function that has a timer associated and executes upon time completing, but can also be cancelled by a new input


    function debounce(func, timeout = 600) {
        let timer;
        return (...args) => {
            clearTimeout(timer)
            timer = setTimeout(() => {func.apply(this, args)}, timeout)
        }
    }



    return(
        <div>
            <input type='search' onChange={(e) => updateSearch(e.target.value)}></input>
        </div>
    )
}

export default ResponsiveSearch