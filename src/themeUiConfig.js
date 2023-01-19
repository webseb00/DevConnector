import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiCssBaseline : {
      styleOverrides: {
        body: {
          backgroundColor: '#1e293b'
        }
      }
    }
  },
  palette: {
    primary: {
      main: '#2563eb',
    },
    custom_silver: {
      main: '#d1d5db'
    },
    custom_slate: {
      main: '#94a3b8',
      light: '#e2e8f0',
      dark: '#1e293b'
    },
    socials: {
      twitter: '#00acee',
      linkedin: '#0e76a8',
      youtube: ' #c4302b',
      instagram: '#833AB4',
      github: '#333333'
    }
  },
  typography: {
    color: '#fff'
  }
})

export default theme