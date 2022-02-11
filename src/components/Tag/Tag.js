import { useEffect, useState } from "react"
import PropTypes from 'prop-types'
import './Tag.css'

const Tag = ({ text, enabled, onToggle, interactable }) => {
    const [isEnabled, setIsEnabled] = useState(enabled)
    const toggleDisabled = () => {
        setIsEnabled(isEnabled ? false : true)
    }

    useEffect(() => {
        onToggle(isEnabled)
    }, [isEnabled])

    return(
        <span className={`tag ${!isEnabled ? 'disabled' : ''}`} onClick={interactable ? toggleDisabled : null}>{text}</span>
    )
}

Tag.propTypes = {
    enabled: PropTypes.bool,
    text: PropTypes.string.isRequired,
    onToggle: PropTypes.func,
    interactable: PropTypes.bool
}

Tag.defaultProps = {
    enabled: true,
    onToggle: () => {},
    interactable: true
}

export default Tag