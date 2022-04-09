import axios from 'axios'

const getAll = () => {
    return axios.get("http://localhost:3001/persons")
}

const createPerson = object => {
    return axios.post("http://localhost:3001/persons", object)
}

const deletePerson = (id) => {
    if (window.confirm(`Delete user? `)) {
        return axios.delete(`http://localhost:3001/persons/${id}`)
    }
}

const update = (id, object) => {
    const request = axios.put(`http://localhost:3001/persons/${id}`, object)
    return request.then(response => response.data)
}


export default { getAll, createPerson, deletePerson, update }