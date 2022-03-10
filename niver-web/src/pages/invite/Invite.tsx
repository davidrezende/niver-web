import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import GroupsIcon from '@mui/icons-material/Groups';
import StarIcon from '@mui/icons-material/StarBorder';
import { LoadingButton } from '@mui/lab';
import { CircularProgress, ThemeProvider } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';
import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Copyright } from '../../components/Copyright';
import AuthContext from '../../context/auth';
import { GroupService } from '../../services/GroupService';
import { InviteService } from '../../services/InviteService';
import { DefaultTheme } from '../../shared/themes/Default';
import IInviteInfoData from '../../shared/types/ResponseInviteInfo';

export default function Invite() {
  let { inviteId } = useParams();
  const [inviteInfo, setInviteInfo] = useState<IInviteInfoData | null>(null)
  const [loading, setLoading] = useState(false)
  const [loadingAddMember, setLoadingAddMember] = useState(false)
  const [sucessInvited, setSucessInvited] = useState(false)
  const [notRegistered, setNotRegistered] = useState(false)
  const { user } = useContext(AuthContext);
  let navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  function checkIfValidUUID(str: string): Boolean {
    const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
    return regexExp.test(str);
  }


  const handleGetInfoFromInviteGroup = async (hashInvite: string) => {
    setLoading(true)
    await delay(3000)
    await InviteService.getInfoFromInvite(hashInvite)
      .then((response) => {
        if (response.status === 200) {
          setLoading(false)
          setInviteInfo(response.data)
        } else {
          console.log('erro ao tentar recriar convite')
        }
      }).catch((response) => {
        console.log('erro desconhecido ao tentar recuperar infos do convite')
        setLoading(false)
      })
  }

  useEffect(() => {
    if (!!inviteId && checkIfValidUUID(inviteId)) {
      // setInviteInfo({ "groupId": 15, "ownerId": 2, "groupName": 'Sekai', "ownerName": 'Haru' })
      handleGetInfoFromInviteGroup(inviteId)
    }
  }, [])


  const handleAddMember = async () => {
    if (!!user && !!inviteInfo) {
      setLoadingAddMember(true)
      await delay(2000)
      GroupService.addPersonInGroup({ idPerson: user, idGroup: inviteInfo!.groupId, hash: inviteId }).then(async (response) => {
        if (response.status === 200) {
          setLoadingAddMember(false)
          setSucessInvited(true)
          await delay(3000)
          navigate('/groups')
        }
      }).catch((error) => {
        setLoadingAddMember(false)
        setSucessInvited(true)
        navigate('/groups')
      })

    } else {
      enqueueSnackbar('🤖 Opa! Para aceitar um convite, você precisa estar logado. Vamos redirecionar você ao cadastro.')
      setLoadingAddMember(true)
      await delay(2000)
      setLoadingAddMember(false)
      setNotRegistered(true)
      await delay(2000)
      setLoadingAddMember(true)
      console.log('redirecionndo usuario nao logado para a tela de registro')
      navigate('/register')
    }
  };

  function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  const tier =
  {
    title: !!inviteInfo ? inviteInfo!.groupName : null,
    subheader: 'Grupo',
    buttonText: sucessInvited ? 'Redirecionando...' : notRegistered? 'Opa! Você não está logado. Aguarde estamos redirecionando...' : 'Entrar no grupo',
    buttonVariant: 'contained'
  }
    ;

  const themePrefer = React.useMemo(
    () =>
      DefaultTheme('dark'),
    [],
  );

  return (
    <React.Fragment>
      <ThemeProvider theme={themePrefer}>
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
            <img alt="NiverDeQuem Logo" width='180' height='100' src={require('./../../shared/images/logo_niver.png')} />
          </Toolbar>
        </AppBar>
        {/* Hero unit */}

        {

          loading ?

            <Box sx={{ m: 5, display: 'flex', justifyContent: 'center' }}>
              <CircularProgress color='secondary' disableShrink />
            </Box>

            :

            inviteInfo === null ?

              <>
                <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>

                  <Typography
                    component="h3"
                    variant="h4"
                    align="center"
                    color="text.primary"
                    gutterBottom
                  >
                    Convite inválido ou talvez já não exista mais! 🥺
                  </Typography>
                  <Typography variant="h5" align="center" color="text.secondary" component="p">
                    Informe ao dono do grupo para criar um novo convite ou te mandar o novo link. 
                  </Typography>
                </Container>
              </>

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
                    {inviteInfo!.ownerName?.split(" ")[0]} te enviou um convite
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
                            disabled={sucessInvited || loadingAddMember || notRegistered}
                            loading={loadingAddMember}
                            color={sucessInvited ? 'success' : 'info'}
                            variant={tier.buttonVariant as 'outlined' | 'contained'}
                            startIcon={sucessInvited ? <CheckCircleIcon /> : notRegistered ? '' : <GroupsIcon />}
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
      </ThemeProvider>
    </React.Fragment>
  );
}
