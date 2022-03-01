import { PersonApi } from "../providers"
import IPersonPasswordUpdateData from "../shared/types/RequestUpdatePasswordPerson"
import IPersonUpdateData from "../shared/types/RequestUpdatePerson copy"


const getPersonById = (userId: number) =>  PersonApi.get('/id/' + userId) 
const updatePerson = (personUpdate: IPersonUpdateData) =>  PersonApi.put('/', personUpdate ) 
const updatePasswordPerson = (personPasswordUpdate: IPersonPasswordUpdateData) =>  PersonApi.put('/password', personPasswordUpdate ) 

export const PersonService = {
  getPersonById,
  updatePerson,
  updatePasswordPerson
}