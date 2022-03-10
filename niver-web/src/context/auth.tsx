import { useSnackbar } from 'notistack';
import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarApi, GroupApi, InviteApi, MemberApi, PersonApi } from '../providers';
import { AuthenticationService } from '../services/AuthenticationService';
import ICredentialsData from '../shared/types/Login';
import ITokenData from '../shared/types/Token';

interface AuthContextData {
  signed: boolean;
  user: number | null;
  Login(credentials: ICredentialsData): void;
  Logout(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<number | null>(null);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    const storagedUserId = localStorage.getItem('@App:userId');
    const storagedToken = localStorage.getItem('@App:token');
    if (storagedToken && storagedUserId && validateTokenExpiration(storagedToken)) {
      setUser(+storagedUserId);
      console.log('setei o usuario logado:', storagedUserId)
      PersonApi.defaults.headers.common.Authorization = `Bearer ${storagedToken}`;
      MemberApi.defaults.headers.common.Authorization = `Bearer ${storagedToken}`;
      InviteApi.defaults.headers.common.Authorization = `Bearer ${storagedToken}`;
      GroupApi.defaults.headers.common.Authorization = `Bearer ${storagedToken}`;
      CalendarApi.defaults.headers.common.Authorization = `Bearer ${storagedToken}`;
    } else {
      if(!!!user){
        Logout()
      }
    }
  }, [user]);

  function validateTokenExpiration(token: string): Boolean {
    const decodedJwt = parseJwt(token);
    if (decodedJwt.exp * 1000 < Date.now()) {
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

  function Login(credentials: ICredentialsData) {
    // const {data, status} = 
    AuthenticationService.login({ "email": credentials.email, "password": credentials.password }).then((response) => {
      var auth = JSON.parse(JSON.stringify(response.data)!) as ITokenData
      setUser(auth.userId!);
      console.log('loguei o usuario:', auth.userId!.toString())
      localStorage.setItem('@App:userId', auth.userId!.toString());
      localStorage.setItem('@App:userName', auth.userName);
      localStorage.setItem('@App:token', auth.accessToken);
      PersonApi.defaults.headers.common.Authorization = `Bearer ${auth.accessToken}`;
      MemberApi.defaults.headers.common.Authorization = `Bearer ${auth.accessToken}`;
      InviteApi.defaults.headers.common.Authorization = `Bearer ${auth.accessToken}`;
      GroupApi.defaults.headers.common.Authorization = `Bearer ${auth.accessToken}`;
      CalendarApi.defaults.headers.common.Authorization = `Bearer ${auth.accessToken}`;
      enqueueSnackbar('Seja bem vindo! 👋👋👋');
      navigate('groups')
    }).catch((error) => {
      if (error.response?.status === 401) {
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