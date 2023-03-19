import React, { useState } from "react";
//import { makeStyles } from '@mui/material/styles'
import {
  Grid,
  Container,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
  CssBaseline,
} from "@mui/material";
import fondo from "./images/fondo.png";
import { LockOutlined as LockOutlinedIcon } from "@mui/icons-material";

/*
const useStyles = makeStyles(theme => ({
	root: {
		backgroundImage: `url(${fondo})`,
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		height: '100vh'
	},
	container: {
		opacity: '0.8',
		height: '60%',
		marginTop: theme.spacing(10),
		[theme.breakpoints.down(400 + theme.spacing(2) + 2)]: {
			marginTop: 0,
			width: '100%',
			height: '100%'
		}
	},
	div: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.primary.main
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(1)
	},
	button: {
		margin: theme.spacing(3, 0, 2)
	}
}))*/
/*
const classes = {
  root: {
    backgroundImage: `url(${fondo})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
  },
  container: {
    opacity: "0.8",
    height: "60%",
    marginTop: "40px auto",
  },
  div: {
    marginTop: "8",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: "1",
  },
  form: {
    width: "100%",
    marginTop: "1",
  },
  button: {
    margin: "3 0 2 auto",
  },
};
*/

const root = {
  backgroundImage: `url(${fondo})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "100vh",
};
const container = {
  opacity: "0.8",
  height: "60%",
  marginTop: "10%",
  width: "100%",
  height: "100%",
};
const div = {
  marginTop: "10%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};
const avatar = {
  margin: "1",
};
const form = {
  width: "100%",
  marginTop: "10%",
};
const button = {
  margin: "3 0 2 auto",
};

const URL = "https://5444-146-158-156-138.eu.ngrok.io/api/usuarios/login/";

const App = () => {
  const [body, setBody] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setBody({
      ...body,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = () => {
    console.log(body);
    fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  return (
    <Grid container component="main" className={root}>
      <CssBaseline />
      <Container
        component={Paper}
        elevation={5}
        maxWidth="xs"
        className={container}
      >
        <div className={div}>
          <Avatar className={avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <form className={form}>
            <TextField
              fullWidth
              autoFocus
              color="primary"
              margin="normal"
              variant="outlined"
              label="Username"
              name="username"
              value={body.username}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              type="password"
              color="primary"
              margin="normal"
              variant="outlined"
              label="Password"
              name="password"
              value={body.password}
              onChange={handleChange}
            />
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              className={button}
              onClick={() => onSubmit()}
            >
              Sign In
            </Button>
          </form>
        </div>
      </Container>
    </Grid>
  );
};

export default App;
