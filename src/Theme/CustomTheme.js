import { createMuiTheme } from "@material-ui/core/styles";
import grey from "@material-ui/core/colors/grey";
import red from "@material-ui/core/colors/red";
// import green from "@material-ui/core/colors/green";

const theme = createMuiTheme({
  palette: {
    primary: grey,
  },
  typography: {
    fontFamily: 'Ubuntu',
  },
  overrides: {
    MuiCard: {
      root: {
        margin: 8,
      },
    },
    MuiCardContent: {
      root: {
        backgroundColor: '#F4F4F4',
        textTransform: 'uppercase',
      },
    },
    MuiCardMedia: {
      root: {
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
      },
    },
    MuiCardActions: {
      root: {
        backgroundColor: '#F4F4F4',
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
      },
    },
    MuiButton: {
      root: {
        fontFamily: 'Ubuntu',
        borderRadius: 8,
      },
      outlined: {
        borderColor: '#000',
        borderWidth: 2,
      },
    },
    MuiTypography: {
      h2: {
        fontFamily: 'Rift',
        fontWeight: 'bold',
      },
      h3: {
        fontFamily: 'Rift',
        fontWeight: 'bold',
      },
      h5: {
        fontFamily: 'Rift',
        fontWeight: 'bold',
      },
      subtitle1: {
        fontFamily: 'Ubuntu',
        textTransform: 'uppercase',
        color: '#7C7C7C',
        fontSize: 14,
      },
    },
  }
});

export const primaryTheme = createMuiTheme({
  palette: {
    primary: red,
    secondary: {
      main: grey[300],
    },
  },
  typography: {
    fontFamily: 'Ubuntu',
  },
  overrides: {
    MuiTypography: {
      body1: {
        fontFamily: 'Ubuntu',
        textTransform: 'none',
        textAlign: 'justify',
        color: '#56585A',
      },
      h2: {
        fontFamily: 'Rift',
        fontWeight: 'bold',
      },
      h3: {
        fontFamily: 'Rift',
        fontWeight: 'bold',
      },
      h5: {
        fontFamily: 'Rift',
        fontWeight: 'bold',
      },
      subtitle1: {
        fontFamily: 'Ubuntu',
        textTransform: 'uppercase',
        color: '#7C7C7C',
        fontSize: 14,
      },
      subtitle2: {
        fontFamily: 'Ubuntu',
        textTransform: 'uppercase',
        color: '#000',
        fontSize: 14,
      },
    },
    MuiButton: {
      root: {
        fontFamily: 'Ubuntu',
        borderRadius: 8,
      },
      outlined: {
        borderColor: '#000',
        borderWidth: 2,
      },
    },
    MuiFormControl: {
      root: {
        flex: 1,
      },
    },
    MuiInputBase: {
      root: {
        backgroundColor: '#FFF'
      },
    },
    MuiOutlinedInput: {
      input: {
        paddingTop: 9,
        paddingBottom: 9,
      },
    },
  },
});

export default theme;
