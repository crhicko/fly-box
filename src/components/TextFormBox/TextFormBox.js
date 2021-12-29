const TextFormBox = ({placeholder, title, setText, checkmark}) => {
    console.log(title)
    console.log(checkmark)
    return (
        <div className='textFormBox'>
            <h4>{title}</h4>
            {typeof checkmark !== 'undefined' && <span style={checkmark ? {color : "green"} : {color: "red"}}>Test</span>}
            <input placeholder={placeholder} onChange={(e) => setText(e.target.value)}/>
        </div>
    )
}

export default TextFormBox