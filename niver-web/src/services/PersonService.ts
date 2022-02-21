import { PersonApi } from "../providers"


const getPersonById = (userId: number) =>  PersonApi.get('/id/' + userId) 

export const PersonService = {
  getPersonById,
}