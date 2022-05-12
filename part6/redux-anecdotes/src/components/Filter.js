import { updateFilter } from "../reducers/filterReducer"
import { connect } from 'react-redux'

const Filter = (props) => {
    //const dispatch = useDispatch() 6.20

    const handleChange = (e) => {
        //dispatch(updateFilter(e.target.value))
        props.updateFilter(e.target.value)
    }


    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}

const mapDispatchToProps = {
    updateFilter
}

export default connect(null, mapDispatchToProps)(Filter)