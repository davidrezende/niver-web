import { BaseApi } from "../providers"
import ICredentialsData from "../shared/types/Login"

const login = (credentials: ICredentialsData) => BaseApi.post('/auth/api/authenticate', credentials)

export const AuthenticationService = {
  login,
}