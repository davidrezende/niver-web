import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Copyright } from '../../components';
import ResponsiveAppBar from '../../components/AppBarHome';
import BG_1 from '../../shared/images/bg_1.jpg';
import BG_2 from '../../shared/images/bg_2.jpg';
import BG_3 from '../../shared/images/bg_3.jpg';
import { DefaultTheme } from '../../shared/themes/Default';

export default function Home() {
  const themePrefer = React.useMemo(
    () =>
      DefaultTheme('dark'),
    [],
  );

  function setRandomPhrase(max: number) {
    return setPhrase(phrases[(Math.floor(Math.random() * max))]);
  }
  function setRandomBanner(max: number) {
    return setBanner(banners[(Math.floor(Math.random() * max))]);
  }

  const phrases =
    [
      { title: 'Esqueceu do aniversário de alguém? 🙊😿', subtitle: 'Cadastre-se, crie seu grupo e convide seus amigos. É simples e rápido. Avisamos vocês com antecedência para não esquecerem nenhuma data de aniversário.' },
      { title: 'Não é bom com datas? 😥', subtitle: 'Deixe com a gente. Cadastre-se, crie seu grupo e convide seus amigos. É simples e rápido. Avisamos vocês com antecedência para não esquecerem nenhuma data de aniversário.' },
      { title: 'Avise de forma simples e prática seu grupo 🎉', subtitle: 'Avisamos vocês quando alguém do grupo estiver próximo de fazer aniversário!' },
    ];

    const banners = 
    [
      { url: 1},
      { url: 2},
      { url: 3},
    ]
  let navigate = useNavigate();
  const [phrase, setPhrase] = useState<{ title: string, subtitle: string }>()
  const [banner, setBanner] = useState<{ url: number}>()

  useEffect(() => {
    setRandomPhrase(phrases.length)
    setRandomBanner(banners.length)
  }, [])

  return (
    <ThemeProvider theme={themePrefer}>
      <Grid container component="main" sx={{
        backgroundColor: 'rgb(0 0 0 / 100%)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        < ResponsiveAppBar />
        <Grid container component="main" justifyContent="flex-end" sx={{
          height: '93.5vh',
          // backgroundImage: 'url(https://source.unsplash.com/random)',
          backgroundImage: `url(${banner?.url === 1 ? BG_1 : banner?.url === 2 ? BG_2 : BG_3})`,
          backgroundRepeat: 'repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundPosition: 'center',
            backgroundSize: 'cover',
        }}>
          <CssBaseline />
          
          <Grid
            item
            xs={false}
            sm={5}
            sx={{
              alignContent: 'center',
              alignItems: 'center',
              flexGrow: 1,
              display: 'flex',
              flexWrap: 'wrap',
              m: 1
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                p: 1,
                m: 1,
                bgcolor: 'rgb(0 0 0 / 76%)',
                borderRadius: 1,
                flexWrap: 'wrap',
                flexGrow: 1,
                color: 'white'
              }}
            >
              <Grid item>
              </Grid >
              <Grid item xs sx={{ml: 2}}>
                <Typography variant="h4" component="div" sx={{ fontFamily: 'Roboto' }} align='left'>
                  <strong>{phrase?.title}</strong>
                </Typography>
                <br />
                <Typography variant="h6" component="div" sx={{ fontFamily: 'Roboto'}} align='left'>
                  {phrase?.subtitle}
                </Typography>
                <br />
                <Box sx={{
                  alignContent: 'center',
                  alignItems: 'center',
                  flexGrow: 1,
                  display: 'flex'
                }}>
                  <Button color="info" sx={{backgroundColor: 'orange', color:'black'}} variant="contained" onClick={() => navigate('/register')}>Quero me cadastrar e começar a usar! 👌</Button>  <Typography></Typography>
                </Box>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} sm={8} md={3} component={Paper} elevation={6} square direction="column" justifyContent="center"
            sx={{
              backgroundColor: 'rgb(0 0 0 / 66%)',
              alignItems: 'center',
              display: 'flex',
              flexWrap: 'wrap'
            }}>
            <Box 
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Box sx={{ mt: 1 }}>
                <Box sx={{ flexWrap: 'wrap' }} >
                  <img alt="NiverDeQuem Logo" width="90%" src={require('./../../shared/images/logo_niver.png')} />
                </Box>
                <Copyright />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}