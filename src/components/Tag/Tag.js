import { useEffect, useState } from "react"
import PropTypes from 'prop-types'

const Tag = ({ text, enabled, onToggle }) => {
    const [isEnabled, setIsEnabled] = useState(enabled)
    const toggleDisabled = () => {
        setIsEnabled(isEnabled ? false : true)
    }

    useEffect(() => {
        onToggle(isEnabled)
    }, [isEnabled])

    return(
        <span className={`tag ${!isEnabled ? 'disabled' : ''}`} onClick={toggleDisabled}>{text}</span>
    )
}

Tag.propTypes = {
    enabled: PropTypes.bool,
    text: PropTypes.string.isRequired,
    onToggle: PropTypes.func
}

Tag.defaultProps = {
    enabled: true,
    onToggle: () => {}
}

export default Tag