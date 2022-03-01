import { createTheme, CustomTheme, PaletteMode } from '@mui/material';
import { cyan, yellow, blue, orange } from '@mui/material/colors';


export const DefaultTheme = (mode: PaletteMode) => {
  return (createTheme(
    {
      palette: {
        mode,
        ...(mode === 'light'
          ?
          {
            primary: {
              main: blue[700],
              dark: yellow[800],
              light: blue[500],
              contrastText: '#ffffff',
            },
            secondary: {
              main: cyan[500],
              dark: cyan[400],
              light: cyan[300],
              contrastText: '#ffffff',
            },
            background: {
              paper: '#rgb(200 200 200)',
              // default: '#202124',
              default: 'rgb(255 255 255)',
            },
          }
          :
          {
            primary: {
              main: yellow[800],
              dark: blue[800],
              light: yellow[600],
              contrastText: '#000000',
            },
            secondary: {
              main: cyan[500],
              dark: cyan[400],
              light: cyan[300],
              contrastText: '#000000',
            },
            background: {
              paper: '#303134',
              default: '#202124',
            },
          }),
      },
      typography: {
        allVariants: {
          ...(mode === 'light'
            ? {
              color: 'black'
            }
            :
            {
              color: 'white'
            }
          )
        }
      },
      components: {
        MuiAppBar: {
          styleOverrides: {
            ...(mode === 'light'
              ? {
                root: {
                  backgroundColor: 'rgb(0 121 217)',
                  color: 'white'
                },
              }
              :
              {
                root: {
                  backgroundColor: 'rgb(219 152 0)',
                },
              }
            )
          },
        },
        MuiDrawer: {
          styleOverrides: {
            ...(mode === 'light'
              ? 
              {
                // root: {
                //   backgroundColor: 'rgb(255 255 255)',
                //   color: 'white'
                // },
                // paper: {
                //   backgroundColor: 'rgb(255 255 255 / 30%)',
                //   color: 'white'
                // },
              }
              :
              {

              }
              // {
              //   root: {
              //     backgroundColor: 'rgb(154 106 0)',
              //   },
              //   paper: {
              //     backgroundColor: 'rgb(154 106 0)',
              //   },
              // }
            )
          }
        },
        MuiTableContainer: {
          styleOverrides: {
            ...(mode === 'light'
              ? {
                root: {
                  backgroundColor: 'rgb(243 243 243)',
                }
              }
              :
              {
                root: {
                  backgroundColor: 'rgb(13 13 13)',
                }
              }
            )
          },
        },
        MuiAccordion: {
          styleOverrides: {
            ...(mode === 'light'
              ? {
                root: {
                  backgroundColor: 'rgb(243 243 243)',
                }
              }
              :
              {
                root: {
                  backgroundColor: 'rgb(13 13 13)',
                }
              }
            )
          },
        },
        MuiCssBaseline: {
          styleOverrides: {
            ".MuiCalendarPicker-root": {
              ...(mode === 'light'
                ? {
                  backgroundColor: 'rgb(243 243 243)',
                }
                :
                {
                  backgroundColor: 'rgb(13 13 13)',
                  color: 'rgb(1 63 112)'
                }
              )
            }
          }
        },
        MuiAccordionDetails: {
          styleOverrides: {
            ...(mode === 'light'
              ? {
                root: {
                  backgroundColor: 'rgb(214 214 214)',
                }
              }
              :
              {
                root: {
                  backgroundColor: 'rgb(255 255 255 / 10%)',
                }
              }
            )
          },
        },
        MuiPaper: {
          styleOverrides: {
            ...(mode === 'light'
              ? {
                root: {
                  backgroundColor: '#ffffff',
                }
              }
              :
              {
              }
            )
          },
        },
      }
    }
  ))
}