import axios from 'axios'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get('/api/blogs')
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }
  const res = await axios.post('/api/blogs', newObject, config)
  return res.data
}

const update = (id, newObject) => {
  const req = axios.put(`${'/api/blogs'} / ${id}`, newObject)
  return req.then(res => res.data)
}

export default { setToken, create, update, getAll }