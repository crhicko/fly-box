const BarItem = (props) => {
    return(
        <li>{props.title}</li>
    )
}

BarItem.defaultProps = {
    title: 'BarItem'
}

export default BarItem