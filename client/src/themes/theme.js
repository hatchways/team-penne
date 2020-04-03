import { createMuiTheme } from "@material-ui/core";

export const landingTheme = createMuiTheme({
  typography: {
    fontFamily: '"Open Sans"',
    fontSize: 16
  },
  overrides: {
    MuiButton: {
      contained: {
        backgroundColor: "#DF1B1B",
        color: "white",
		    fontWeight: "bold",
        borderRadius: "500px",
        marginTop: "55px"
      }
    },
    MuiContainer: {
      root: {
        textAlign: "center"
      }
    }
  }
});

export const dialogTheme = createMuiTheme({
  typography: {
    fontFamily: '"Open Sans"',
    h6: {
      fontSize: 24,
      fontWeight: 900
    },
    body1: {
      marginBottom: "15px"
    }
  },
  overrides: {
    MuiInputLabel: {
      root: {
        color: "black",
        fontWeight: 900,
        marginTop: "30px"
      }
    },
    MuiDialog: {
      root: {
        textAlign: "center",
      }
    },
    MuiDialogTitle: {
      root: {
        paddingBottom: 0
      }
    },
    MuiOutlinedInput: {
      root: {
        width: "75%",
        marginBottom: 0
      },
      input: {
        textAlign: "center"
      }
    },
    MuiButton: {
      contained: {
        backgroundColor: "#DF1B1B",
        color: "white",
		    fontWeight: "bold",
        borderRadius: "500px",
        marginBottom: "25px"
      }
    },
    MuiLink: {
      root: {
        color: "#DF1B1B",
        fontWeight: "bold",
        cursor: "pointer",
      }
    },
    MuiDivider: {
      root: {
        marginBottom: "20px"
      }
    },
    MuiDialogActions: {
      root: {
        justifyContent: "center"
      }
    },
    MuiAlert: {
      root: {
        marginTop: "10px"
      }
    }
  }
});