import './ResponsiveSearch.css'
import { useState, useCallback, useEffect, useRef } from 'react'
import useDidUpdateEffect from '../../util/useDidUpdateEffect'

const ResponsiveSearch = ({}) => {

    const getSearchResults = async (text) => {
        console.log("Call to get search results")
        const res = await fetch(process.env.REACT_APP_API_URL + '/flies?search=' + text, {
            method: 'GET',
            signal: controller.signal
        })
        console.log(res)
        if(res.body)
            console.log(await res.json())
    }

    const [search, setSearch] = useState('')
    const [searchResults, setSearchResults] = useState([])
    // const apiCall = useRef(debounce(text => getSearchResults(text)))
    const controller = useRef(new AbortController())
    // const cb = useCallback(fakeCB(() => console.log("ballsack")), [])
    const apiCallCB = useCallback(debounce(getSearchResults), [])

    const updateSearch = (text) => {
        setSearch(text)
    }

    useDidUpdateEffect(() => {
        // console.log(apiCallCB)
        // console.log(cb)
        // console.log(a)
        // a()
        // console.log(apiCall.current)
        apiCallCB(search)
    }, [search])



    //make a api call that can be aborted to return the 5 closest flies to the search query
    //abort on a change to the search text
    //send api call upon debounce
    //Debounce: function that has a timer associated and executes upon time completing, but can also be cancelled by a new input


    function debounce(func, timeout = 300) {
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