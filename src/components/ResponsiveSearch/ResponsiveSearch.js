import './ResponsiveSearch.css'
import { useState, useCallback, useEffect, useRef } from 'react'

const ResponsiveSearch = ({}) => {

    const getSearchResults = async (text) => {
        const res = await fetch(process.env.REACT_APP_API_URL + '/flies?search=' + text, {
            method: 'GET',
            signal: controller.signal
        })
        console.log(await res.json())
    }

    const [search, setSearch] = useState('')
    const [searchResults, setSearchResults] = useState([])
    // const apiCall = useRef(() => debounce(fakeFunc))
    const controller = useRef(new AbortController())
    const apiCallCB = useCallback(debounce(getSearchResults), [])

    const updateSearch = (text) => {
        setSearch(text)
    }

    useEffect(() => {
        apiCallCB(search)
    }, [search])



    //make a api call that can be aborted to return the 5 closest flies to the search query
    //abort on a change to the search text
    //send api call upon debounce
    //Debounce: function that has a timer associated and executes upon time completing, but can also be cancelled by a new input


    function debounce(func, timeout = 300) {
        let timer;
        console.log('here3')
        console.log(func)
        return (...args) => {
            console.log("here2")
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