import {useState} from 'react'

const AddFly = ({ onAdd }) => {
    const [name, setName] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()

        if(!name) {
            alert("add name")
            return
        }

        onAdd({ name })

        setName('')
    }

    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control>'>
                <label>Fly Name</label>
                <input type='text' value={name} onChange={(e) => setName(e.target.value)}></input>
            </div>
            <input type='submit' value='Save Fly'></input>
        </form>
    )
}

export default AddFly