import { useState, useImperativeHandle, forwardRef } from "react";

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
                <button onClick={toggleVisib}>{props.label}</button>
            </div>
            <div style={showVisible}>
                {props.children}
                <button onClick={toggleVisib}>Cancel</button>
            </div>
        </div>
    )
})

export default Toggle