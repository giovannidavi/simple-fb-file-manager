import { createTheme, ThemeProvider } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import React from 'react';
import { Redirect, BrowserRouter as Router, Switch } from 'react-router-dom';
import { ProtectedRoute } from './components/organisms';
import { useAuthentication } from './hooks';
import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';
import Upload from './views/Upload';

const theme = createTheme({
  palette: {
    primary: {
      main: '#333333',
      dark: '#000000',
    },
    secondary: {
      main: grey['50'],
      light: grey['50'],
      dark: grey['900'],
    },
  },
  overrides: {
    MuiOutlinedInput: {
      notchedOutline: {
        border: '1px solid',
        borderColor: '#333333 !important',
        borderRadius: 20,
        '&:hover': {
          border: '1px solid #000000',
          borderColor: '#000000',
        },
      },
    },
  },
});

const App: React.FC = () => {
  const {
    profile: { isAdmin },
  } = useAuthentication();
  return (
    <div style={{ marginTop: 50 }}>
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <ProtectedRoute path="/home" component={() => <Home />} />
            <ProtectedRoute path="/upload" authorized={isAdmin} component={() => <Upload />} />
            <ProtectedRoute path="/login" component={() => <Login />} authenticated={false} />
            <ProtectedRoute path="/register" component={() => <Register />} authorized={isAdmin} />
            <Redirect from="/" to="/home" />
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
};

export default App;
