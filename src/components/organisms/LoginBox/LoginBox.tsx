import React from 'react';
import { Box, Paper, Button, TextField } from '@material-ui/core';
import { useState } from 'react';
import { useFirebase } from 'react-redux-firebase';
import { useAuthentication } from '../../../hooks';

type Props = {
  showRegister?: boolean;
  width?: string | number;
  onLoginCallback?: () => void;
};

const LoginBox: React.FC<Props> = ({
  showRegister,
}) => {
  const { error } = useAuthentication()
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const firebase = useFirebase();
  const onLogin = () => {
    if (email && password) {
      firebase.login({ email, password })
    }
  };
  const onRegister = () => {
    if (email && password) {
      firebase.createUser({ email, password }, { email });
    }
  };
  return (
    <Box width={500} maxWidth="100%" margin="auto">
      <Paper variant="outlined">
        <Box padding={2}>
          <TextField name="email" label="email" fullWidth value={email} onChange={e => setEmail(e.target.value)} variant="filled" size="small" />
          <div style={{ margin: '10px 0' }} />
          <TextField name="password" label="password" type="password" fullWidth value={password} onChange={e => setPassword(e.target.value)} variant="filled" size="small" />
          <div style={{ margin: '10px 0' }} />
          {
            showRegister ? (
              <Button variant="outlined" color="primary" onClick={onRegister} fullWidth>
                Register
              </Button>
            ) : (
                <Button variant="outlined" color="primary" onClick={onLogin} fullWidth>
                  Login
                </Button>
              )}
        </Box>
        {error && error.code}
      </Paper>
    </Box>
  );
};

LoginBox.displayName = 'LoginBox';

export default React.memo(LoginBox);
