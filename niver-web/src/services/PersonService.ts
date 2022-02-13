import { PersonApi } from "../providers"

const getPersonById = () => PersonApi.get('/id/12')

export const PersonService = {
  getPersonById,
}