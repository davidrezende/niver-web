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
import { useContext, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
import { Avatar, createTheme, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { Copyright } from '../../components/Copyright';
import AuthContext from '../../context/auth';



const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const theme = createTheme();

export default function Invite() {
  let { inviteId } = useParams();
  const { user } = useContext(AuthContext);
  let navigate = useNavigate();

  const handleAddMember = () => {
    if(!!user){
      console.log('user logado')
      navigate('/groups')
    }else{
      console.log('addd member')
      navigate('/register')
    }
  };



  const tiers = [
    {
      title: 'Sekai',
      subheader: 'Grupo',
      buttonText: 'Quero Participar',
      buttonVariant: 'contained',
    },
  ];

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
          justifyContent: 'center' }}>
            <img  width='180' height='100'  src={require('./../../shared/images/logo_niver.png')} />
        </Toolbar>
      </AppBar>
      {/* Hero unit */}

      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>

        <Typography
          component="h3"
          variant="h4"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Haru te enviou um convite
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" component="p">
          Você está a um passo de nunca mais esquecer de celebrar os aniversários de seus amigos!
        </Typography>


      </Container>

      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} sx={{ justifyContent: 'center' }}>
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
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
                  <Button
                  onClick={handleAddMember}
                    fullWidth
                    variant={tier.buttonVariant as 'outlined' | 'contained'}
                  >
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>

              <Typography sx={{ pt: 1 }} variant="subtitle2" align="center" color="text.secondary" component="p">
                É necessário ter um cadastro para conseguir aceitar o convite.
              </Typography>


            </Grid>
          ))}
        </Grid>
      </Container>
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
