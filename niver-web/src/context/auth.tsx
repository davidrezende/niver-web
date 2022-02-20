import React, { createContext, useEffect, useState } from 'react';
import { GroupApi, MemberApi, PersonApi } from '../providers';
import { AuthenticationService } from '../services/AuthenticationService';
import ICredentialsData from '../shared/types/Login';
import ITokenData from '../shared/types/Token';


interface AuthContextData {
  signed: boolean;
  user: object | null;
  Login(credentials: ICredentialsData): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {
  const [user, setUser] = useState<ITokenData | null>(null);
  const [auth, setAuth] = useState<ITokenData>();

  
useEffect(() => {
  const storagedUser = localStorage.getItem('@App:user');
  const storagedToken = localStorage.getItem('@App:token');
  console.log('valor guardado para o token:', storagedToken, ' \n valor guardado para o user:', storagedUser)

  if (storagedToken && storagedUser) {
    console.log('valor guardado para o token:', storagedToken, ' \n valor guardado para o user:', storagedUser)
    setUser(JSON.parse(storagedUser));
    console.log('usuario ja logado:', user)
    PersonApi.defaults.headers.common.Authorization = `Bearer ${storagedToken}`;
    MemberApi.defaults.headers.common.Authorization = `Bearer ${storagedToken}`;
    GroupApi.defaults.headers.common.Authorization = `Bearer ${storagedToken}`;
  }
}, []);


  async function Login(credentials: ICredentialsData) {
    const response = await AuthenticationService.login({ "email": credentials.email, "password": credentials.password })
    console.log('resposta do contexto ao logar:', response)
    setUser(response.data)
    localStorage.setItem('@App:user', JSON.stringify(user));
    localStorage.setItem('@App:token', user ? user.accessToken : 'null' );
    console.log('valor guardado para o token:', auth?.accessToken, ' \n valor guardado para o user:', user)
    }

  return(
<AuthContext.Provider value={{ signed: !!user, user, Login }}>
  {children}
</AuthContext.Provider>
  )};
export default AuthContext; 