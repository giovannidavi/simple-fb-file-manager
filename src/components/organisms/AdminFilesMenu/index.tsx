import { Box, Button, Divider, Paper, TextField } from '@material-ui/core';
import { DeleteForever, Image, Unarchive, VisibilityOff } from '@material-ui/icons';
import React from 'react';
import { useHistory } from 'react-router-dom';

const AdminMenu: React.FC = () => {
  const history = useHistory();

  return (
    <Paper variant="outlined">
      <Box padding={2}>
        <small>Admin menu</small>
        <Divider style={{ margin: 10 }} />
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <TextField disabled label="File" variant="outlined" size="small" />
          <Box>
            <Button style={{ marginRight: 5 }} variant="contained" color="primary" disableElevation disabled>
              <Image style={{ marginRight: 5 }} /> Thumb cat.
            </Button>
            <Button style={{ marginRight: 5 }} variant="contained" color="primary" disableElevation disabled>
              <VisibilityOff style={{ marginRight: 5 }} /> Nascondi
            </Button>
            <Button style={{ marginRight: 5 }} variant="contained" color="primary" disableElevation disabled>
              <DeleteForever style={{ marginRight: 5 }} /> Elimina
            </Button>
            <Button
              style={{ marginRight: 5 }}
              variant="contained"
              color="primary"
              disableElevation
              onClick={() => history.push('/upload')}
            >
              <Unarchive style={{ marginRight: 5 }} /> Carica file
            </Button>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};
export default AdminMenu;
