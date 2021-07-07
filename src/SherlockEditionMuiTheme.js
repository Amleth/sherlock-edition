// https://next.material-ui.com/customization/color/
// https://next.material-ui.com/customization/palette/

import {createTheme} from '@material-ui/core/styles'

export default createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: `
            a {
                text-decoration: none !important;
            }
          `,
    },
  },
  palette: {
    colors: {}
  },
  typography: {
    fontFamily: 'Jost',
    fontFamilyMonospaced: 'Fira Code',
    article: {
      fontFamily: 'IM Fell English, Serif',
    },
    note: {
      '&:hover': {
        cursor: 'pointer'
      }
    }
  }
})