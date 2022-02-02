export const getTags = async () => {
    const results = await fetch(process.env.REACT_APP_API_URL + `/tags`, {
        method: 'GET',
        credentials: 'include'
    })
    const data = await results.json()
    return data;
}