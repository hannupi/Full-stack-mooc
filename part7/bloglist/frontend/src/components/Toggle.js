import { useState, useImperativeHandle, forwardRef } from "react"
import PropTypes from 'prop-types'

import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'

const Toggle = forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const hideVisible = {
        display: visible
            ? "none"
            : ""
    }

    const showVisible = {
        display: visible
            ? ""
            : "none"
    }

    const toggleVisib = () => {
        setVisible(!visible)
    }

    // REF varten
    useImperativeHandle(ref, () => {
        return {
            toggleVisib
        }
    })

    return (
        <div>
            <div style={hideVisible}>
                <Button size="sm" onClick={toggleVisib}>{props.label}</Button>
            </div>
            <div style={showVisible}>
                {props.children}
                <Button size="sm" onClick={toggleVisib}>Cancel</Button>
            </div>
        </div>
    )
})

Toggle.displayName = "Toggle"

Toggle.propTypes = {
    label: PropTypes.string.isRequired
}

export default Toggle