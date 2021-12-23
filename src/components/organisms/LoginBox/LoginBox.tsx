import React, { useCallback } from 'react';
import { Box, Button, TextField, Checkbox, FormControlLabel } from '@material-ui/core';
import { useState } from 'react';
import { useFirebase } from 'react-redux-firebase';
import { useAuthentication } from '../../../hooks';
import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles({
  forgotPassword: {
    textTransform: 'none',
  },
});

type Props = {
  showRegister?: boolean;
  width?: string | number;
  onLoginCallback?: () => void;
};

const LoginBox: React.FC<Props> = ({ showRegister }) => {
  const { error } = useAuthentication();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [terms, setTerms] = useState<boolean>(false);
  const [resetPassword, setResetPassword] = useState<boolean>(false);
  const firebase = useFirebase();
  const { forgotPassword } = useStyle();

  const onLogin = useCallback(() => {
    if (email && password) {
      firebase.login({ email, password });
    }
  }, [email, firebase, password]);

  const onRegister = useCallback(() => {
    if (email && password) {
      firebase.createUser({ email, password }, { email });
    }
  }, [email, firebase, password]);

  const openTerms = useCallback((e) => {
    e.stopPropagation();
    window.open('#');
  }, []);

  const toggleResetPassword = useCallback(() => setResetPassword(!resetPassword), [resetPassword]);

  const renderCta = useCallback(() => {
    if (showRegister) {
      return (
        <Button variant="contained" color="primary" onClick={onRegister} fullWidth>
          Registra nuovo utente
        </Button>
      );
    }

    if (resetPassword) {
      return (
        <Box display="flex" flexDirection="column" alignItems="flex-end">
          <Button
            disabled={!email}
            disableElevation
            variant="contained"
            color="primary"
            onClick={() => firebase.resetPassword(email)}
            fullWidth
          >
            Invia email per recupero password
          </Button>
          <Button variant="text" color="primary" onClick={toggleResetPassword} className={forgotPassword}>
            Torna a Login
          </Button>
        </Box>
      );
    }

    return (
      <Box display="flex" flexDirection="column" alignItems="flex-end">
        <Button
          disabled={!email || !password || !terms}
          disableElevation
          variant="contained"
          color="primary"
          onClick={onLogin}
          fullWidth
        >
          Login
        </Button>
        <Button variant="text" color="primary" onClick={toggleResetPassword} className={forgotPassword}>
          Password dimenticata
        </Button>
      </Box>
    );
  }, [
    email,
    firebase,
    forgotPassword,
    onLogin,
    onRegister,
    password,
    resetPassword,
    showRegister,
    terms,
    toggleResetPassword,
  ]);

  return (
    <Box maxWidth="100%" margin="auto">
      <Box>
        <Box padding={2}>
          <TextField
            name="email"
            label="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="filled"
            size="small"
          />
          <div style={{ margin: '10px 0' }} />
          {!resetPassword && (
            <TextField
              name="password"
              label="password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="filled"
              size="small"
            />
          )}
          {!showRegister && !resetPassword && (
            <>
              <div style={{ margin: '10px 0' }} />
              <FormControlLabel
                control={<Checkbox color="primary" value={terms} onChange={(_, v) => setTerms(v)} />}
                label={
                  <span>
                    Dichiaro di avere letto e accettato i{' '}
                    <a href="#!" onClick={openTerms}>
                      termini e le condizioni di utilizzo
                    </a>
                  </span>
                }
              />
            </>
          )}
          <div style={{ margin: '10px 0' }} />
          {renderCta()}
        </Box>
        {error && error.code}
      </Box>
    </Box>
  );
};

LoginBox.displayName = 'LoginBox';

export default React.memo(LoginBox);
