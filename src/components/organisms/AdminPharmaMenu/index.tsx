import { Box, Button, Divider, Paper, TextField } from '@material-ui/core';
import { DeleteForever, Person } from '@material-ui/icons';
import React from 'react';

const AdminMenu: React.FC<{ onAddUser: () => void }> = ({ onAddUser }) => {
  return (
    <Paper variant="outlined">
      <Box padding={2}>
        <small>Admin menu</small>
        <Divider style={{ margin: 10 }} />
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <TextField label="File" variant="outlined" size="small" disabled />
          <Box>
            <Button style={{ marginRight: 5 }} variant="contained" color="primary" disableElevation onClick={onAddUser}>
              <Person style={{ marginRight: 5 }} /> Nuovo Cliente
            </Button>
            <Button style={{ marginRight: 5 }} variant="contained" color="primary" disableElevation disabled>
              <DeleteForever style={{ marginRight: 5 }} /> Elimina
            </Button>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};
export default AdminMenu;
