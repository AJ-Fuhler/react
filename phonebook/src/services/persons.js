import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = async () => {
  let response = await axios.get(baseUrl)
  return response.data
}

const create = async (newPerson) => {
  let response = await axios.post(baseUrl, newPerson)
  return response.data
}

const remove = async (id) => {
  let response = await axios.delete(`${baseUrl}/${id}`)
  return response
}

export default {
  getAll,
  create,
  remove
}