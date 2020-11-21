import { ThemeProvider } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import React from 'react';
import { Redirect, BrowserRouter as Router, Switch } from 'react-router-dom';
import { ProtectedRoute } from './components/organisms';
import { useAuthentication } from './hooks';
import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';
import Upload from './views/Upload';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#333333',
      dark: '#a0792d',
    },
    secondary: {
      main: grey['800'],
      light: grey['50'],
      dark: grey['900'],
    },
  },
  overrides: {
    MuiOutlinedInput: {
      notchedOutline: {
        border: '2px solid',
        borderColor: '#fdb845 !important',
        '&:hover': {
          border: '2px solid #fdb845',
          borderColor: '#fdb845',
        },
      },
    },
  },
});


const App: React.FC = () => {
  const { profile: { isAdmin } } = useAuthentication();
  return (
    <div style={{ marginTop: 50 }}>
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <ProtectedRoute path="/home" component={() => <Home />} />
            <ProtectedRoute path="/upload" authorized={isAdmin} component={() => <Upload />} />
            <ProtectedRoute
              path="/login"
              component={() => <Login />}
              authenticated={false}
            />
            <ProtectedRoute
              path="/register"
              component={() => <Register />}
              authorized={isAdmin}
            />
            <Redirect from="/" to="/home" />
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
};

export default App;
