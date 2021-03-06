import PropTypes from 'prop-types'

const Button = ({onClick}) => {


    return (
        <button onClick={onClick}>
            button
        </button>
    )
}


Button.propTypes = {
    onClick: PropTypes.func.isRequired
}

export default Button