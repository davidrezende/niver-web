import React, { createContext, useEffect, useState } from 'react';
import { GroupApi, MemberApi, PersonApi } from '../providers';
import { AuthenticationService } from '../services/AuthenticationService';
import ICredentialsData from '../shared/types/Login';
import ITokenData from '../shared/types/Token';
import { useSnackbar } from 'notistack';

interface AuthContextData {
  signed: boolean;
  user: number | null;
  Login(credentials: ICredentialsData): Promise<void>;
  Logout(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<number | null>(null);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    const storagedUserId = localStorage.getItem('@App:userId');
    const storagedToken = localStorage.getItem('@App:token');
    // console.log('valor guardado para o token:', storagedToken, ' \n valor guardado para o user:', storagedUser)
    console.log('verificando se usuario esta logado... \n userId:', storagedUserId, '\n token:', storagedToken)
    if (storagedToken && storagedUserId && validateTokenExpiration(storagedToken)) {
      console.log('valor ja guardado para o token:', storagedToken, ' \n valor guardado para o user:', storagedUserId)
      setUser(+storagedUserId);
      console.log('usuario ja logado:', user)
      PersonApi.defaults.headers.common.Authorization = `Bearer ${storagedToken}`;
      MemberApi.defaults.headers.common.Authorization = `Bearer ${storagedToken}`;
      GroupApi.defaults.headers.common.Authorization = `Bearer ${storagedToken}`;
    } else {
      Logout()
    }
  }, []);

  function validateTokenExpiration(token: string): Boolean {
    const decodedJwt = parseJwt(token);
    console.log('exp do token:', decodedJwt.exp)
    if (decodedJwt.exp * 1000 < Date.now()) {
      console.log('token expirado')
      enqueueSnackbar('Sessão expirada! Faça login novamente. 🔐');
      return false
    }
    return true
  }

  const parseJwt = (token: string) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  async function Login(credentials: ICredentialsData) {
    console.log('logando usuario...')
    // const {data, status} = 
    await AuthenticationService.login({ "email": credentials.email, "password": credentials.password }).then((response) => {
      console.log('resposta do servico ao logar:', response)
      var auth = JSON.parse(JSON.stringify(response.data)!) as ITokenData
      setUser(auth.userId!);
      console.log('usuario logado:', auth.userId!.toString())
      localStorage.setItem('@App:userId', auth.userId!.toString());
      localStorage.setItem('@App:userName', auth.userName);
      localStorage.setItem('@App:token', auth.accessToken);
      PersonApi.defaults.headers.common.Authorization = `Bearer ${auth.accessToken}`;
      MemberApi.defaults.headers.common.Authorization = `Bearer ${auth.accessToken}`;
      GroupApi.defaults.headers.common.Authorization = `Bearer ${auth.accessToken}`;
      enqueueSnackbar('Seja bem vindo! 👋👋👋');
    }).catch((error) => {
      if (error.response.status === 401) {
        enqueueSnackbar('Usuário ou senha incorretos. 😢');
      }else{
        enqueueSnackbar('Desculpe, estamos enfrentando problemas 😢');
      }
    })


  }

  function Logout() {
    setUser(null);
    sessionStorage.removeItem('@App:userId');
    sessionStorage.removeItem('App:userName');
    sessionStorage.removeItem('App:token');
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, Login, Logout }}>
      {children}
    </AuthContext.Provider>
  )
};
export default AuthContext; 