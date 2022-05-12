import { connect } from "react-redux"

const Notification = (props) => {
  //const notification = useSelector(state => state.notifications) 6.19 replacing with connect 

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (!props.notification) {
    return null
  }
  return (
    <div style={style}>
      {props.notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notifications
  }
}


export default connect(
  mapStateToProps,
)(Notification)