import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  components: {
    // Name of the component
    MuiSelect: {
      styleOverrides: {
        root: {
            width: '100%'
        },
      },
    },
  },
})
