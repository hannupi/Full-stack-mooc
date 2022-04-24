const Infomessage = ({ message }) => {
    if (message === null) {
        return null
    }
    return (
        <div className="popup">{message}</div>
    )
}

export default Infomessage