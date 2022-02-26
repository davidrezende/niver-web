import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box, { BoxProps } from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import { useContext, useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
import { Avatar, CircularProgress, createTheme, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { Copyright } from '../../components/Copyright';
import AuthContext from '../../context/auth';
import { GroupService } from '../../services/GroupService';
import { InviteService } from '../../services/InviteService';
import IInviteInfoData from '../../shared/types/ResponseInviteInfo';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { LoadingButton } from '@mui/lab';
import GroupsIcon from '@mui/icons-material/Groups';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const theme = createTheme();

export default function Invite() {
  let { inviteId } = useParams();
  const [inviteInfo, setInviteInfo] = useState<IInviteInfoData | null>(null)
  const [loading, setLoading] = useState(false)
  const [loadingAddMember, setLoadingAddMember] = useState(false)
  const [sucessInvited, setSucessInvited] = useState(false)
  const { user } = useContext(AuthContext);
  let navigate = useNavigate();

  function checkIfValidUUID(str: string): Boolean {
    const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
    return regexExp.test(str);
  }

  useEffect(() => {
    setLoading(true)
    setInviteInfo(null)

    // this will clear Timeout
    // when component unmount like in willComponentUnmount
    // and show will not change to true

    if (!!inviteId && checkIfValidUUID(inviteId)) {
      console.log("codigo do convite valido, procurando info do convite")
      setInviteInfo({"idGroup": 15, "idOwner": 2, "nameGroup": 'Sekai', "nameOwner": 'Haru'})
      setLoading(false)
      // InviteService.getInfoFromInvite(inviteId).then((response) => {
      //   setLoading(false)
      //   if (response.status === 200) {
      //     setInviteInfo(response.data)
      //   }
      // }).catch((error) => {
      //   setLoading(false)
      // })
    } else {
      setLoading(false)
    }

  }, [])


  const handleAddMember = async() => {
    if (!!user && !!inviteInfo) {
      console.log('user logado e infos do convite recuperadas')
      setLoadingAddMember(true)
      await delay(2000)
      GroupService.addPersonInGroup({ idPerson: user, idGroup: inviteInfo!.idGroup, hashInvite: inviteId }).then(async (response) => {
        if(response.status === 200){
          setLoadingAddMember(false)
          setSucessInvited(true)
          await delay(3000)
          navigate('/groups')
        }
      }).catch((error) => {
        setLoadingAddMember(false)
        console.log(error)
        setSucessInvited(true)
      })
      
    } else {
      console.log('add member')
      navigate('/register')
    }
  };

  function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  
  const tier = 
    {
      title: !!inviteInfo ? inviteInfo!.nameGroup : null,
      subheader: 'Grupo',
      buttonText: sucessInvited ? 'Redirecionando...' : 'Entrar no grupo',
      buttonVariant: 'contained'
    }
  ;

  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{
          justifyContent: 'center'
        }}>
          <img width='180' height='100' src={require('./../../shared/images/logo_niver.png')} />
        </Toolbar>
      </AppBar>
      {/* Hero unit */}

      {

        loading ?

          <Box sx={{ m: 5, display: 'flex', justifyContent: 'center' }}>
            <CircularProgress color='secondary' disableShrink />
          </Box>

          :

          !!!inviteInfo ?

            navigate('/')

            :

            <>
              <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>

                <Typography
                  component="h3"
                  variant="h4"
                  align="center"
                  color="text.primary"
                  gutterBottom
                >
                  {inviteInfo!.nameOwner?.split(" ")[0]} te enviou um convite
                </Typography>
                <Typography variant="h5" align="center" color="text.secondary" component="p">
                  Você está a um passo de nunca mais esquecer de celebrar os aniversários de seus amigos!
                </Typography>


              </Container>

              <Container maxWidth="md" component="main">
                <Grid container spacing={5} sx={{ justifyContent: 'center' }}>
                    <Grid
                      item
                      key={tier.title}
                      xs={12}
                      sm={6}
                      md={4}
                    >
                      <Card>
                        <CardHeader
                          title={tier.title}
                          subheader={tier.subheader}
                          titleTypographyProps={{ align: 'center' }}
                          action={tier.title === 'Pro' ? <StarIcon /> : null}
                          subheaderTypographyProps={{
                            align: 'center',
                          }}
                          sx={{
                            backgroundColor: (theme) =>
                              theme.palette.mode === 'light'
                                ? theme.palette.grey[200]
                                : theme.palette.grey[700],
                          }}
                        />
                        <CardActions>
                          <LoadingButton
                            onClick={handleAddMember}
                            fullWidth
                            loading={loadingAddMember}
                            color={sucessInvited ? 'success' : 'info'}
                            variant={tier.buttonVariant as 'outlined' | 'contained'}
                            startIcon={sucessInvited ? <CheckCircleIcon /> : <GroupsIcon/>}
                          >
                            {tier.buttonText}
                          </LoadingButton>
                        </CardActions>
                      </Card>
                      <Typography sx={{ pt: 1 }} variant="subtitle2" align="center" color="text.secondary" component="p">
                        É necessário ter um cadastro para conseguir aceitar o convite.
                      </Typography>
                    </Grid>
                </Grid>
              </Container>
            </>
      }

      {/* Footer */}
      <Container
        maxWidth="md"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 8,
          py: [3, 6],
        }}
      >
        <Copyright />
      </Container>
      {/* End footer */}
    </React.Fragment>
  );
}
