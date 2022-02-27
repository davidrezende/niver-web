import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box, { BoxProps } from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Divider } from '@mui/material';
import ResponsiveAppBar from '../../components/AppBarHome';
import { Copyright } from '../../components';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BG_1 from '../../shared/images/bg_1.jpg';
import BG_2 from '../../shared/images/bg_2.jpg';
import BG_3 from '../../shared/images/bg_3.jpg';
const theme = createTheme();

export default function Home() {
  function setRandomPhrase(max: number) {
    return setPhrase(phrases[(Math.floor(Math.random() * max))]);
  }
  function setRandomBanner(max: number) {
    return setBanner(banners[(Math.floor(Math.random() * max))]);
  }

  const phrases =
    [
      { title: 'Esqueceu do aniversário de alguém importante pra você? 🙊😿', subtitle: 'Não se preocupe, estamos aqui para garantir que isso não irá se repetir. Cadastre-se, crie seu grupo e convide seus amigos. É simples e rápido. Avisamos vocês com antecedência para não esquecerem nenhuma data de aniversário.' },
      { title: 'Não é bom com datas? 😥', subtitle: 'Deixe com a gente. Cadastre-se, crie seu grupo e convide seus amigos. É simples e rápido. Avisamos vocês com antecedência para não esquecerem nenhuma data de aniversário.' },
      { title: 'Avise de forma simples e prática seu grupo de trabalho dos aniversários 🎉', subtitle: 'Avisamos vocês quando alguém do grupo estiver próximo de fazer aniversário!' },
      { title: 'Precisa de alguém para te ajudar?', subtitle: 'Crie seu grupo da família, do trabalho ou dos amigos. Convide a galera e deixe que a gente lembre vocês dos aniversários!' }
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
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{
        backgroundColor: 'rgb(0 0 0 / 100%)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        < ResponsiveAppBar />
        <Grid container component="main" justifyContent="flex-end" sx={{
          height: '93vh',
          // backgroundImage: 'url(https://source.unsplash.com/random)',
          backgroundImage: `url(${banner?.url === 1 ? BG_1 : banner?.url === 2 ? BG_2 : BG_3})`,
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
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
                bgcolor: 'rgb(0 0 0 / 66%)',
                borderRadius: 1,
                flexWrap: 'wrap',
                flexGrow: 1,
                color: 'white'
              }}
            >
              <Grid item>
              </Grid >
              <Divider sx={{ ml: 2 }} orientation="vertical" variant='middle' flexItem />
              <Grid item xs>
                <Typography variant="h3" component="div" sx={{ fontFamily: 'Roboto' }} align='left'>
                  <strong>{phrase?.title}</strong>
                </Typography>
                <br />
                <Typography variant="h4" component="div" sx={{ fontFamily: 'Roboto'}} align='left'>
                  {phrase?.subtitle}
                </Typography>
                <br />
                <Box sx={{
                  alignContent: 'center',
                  alignItems: 'center',
                  flexGrow: 1,
                  display: 'flex'
                }}>
                  <Button color="inherit" onClick={() => navigate('/register')}>Gostei quero me cadastrar e começar a usar! 👌</Button>  <Typography></Typography>
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
                <Box sx={{ mb: 5, flexWrap: 'wrap' }} >
                  <img width="90%" src={require('./../../shared/images/logo_niver.png')} />
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