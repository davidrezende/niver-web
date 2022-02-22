import { BaseApi } from "../providers"
import ICredentialsData from "../shared/types/Login"
import IPersonRegisterData from "../shared/types/RequestSavePerson"

const login = (credentials: ICredentialsData) => BaseApi.post('/auth/api/authenticate', credentials)
const register = (newUser: IPersonRegisterData) => BaseApi.post('/auth/api', newUser)

export const AuthenticationService = {
  login,
  register
}