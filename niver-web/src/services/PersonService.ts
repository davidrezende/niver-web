import { PersonApi } from "../providers"
import IPersonUpdateData from "../shared/types/RequestUpdatePerson copy"


const getPersonById = (userId: number) =>  PersonApi.get('/id/' + userId) 
const updatePerson = (personUpdate: IPersonUpdateData) =>  PersonApi.put('/', personUpdate ) 

export const PersonService = {
  getPersonById,
  updatePerson
}