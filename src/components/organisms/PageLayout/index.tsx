import { Box, Button, Divider } from '@material-ui/core';
import { Archive, Contacts, Description, ExitToApp } from '@material-ui/icons';
import React from 'react';
import { useFirestore } from 'react-redux-firebase';
import { useAuthentication } from '../../../hooks';
import XLSX from 'xlsx';
import { useHistory } from 'react-router';

const PageLayout: React.FC = ({ children }) => {
  const {
    logout,
    profile: { isEmpty, isAdmin },
  } = useAuthentication();

  const firestore = useFirestore();
  const history = useHistory();

  const exportLogs = async () => {
    const logs = await firestore.collection('logs').get();
    const data: any[] = [];
    logs.forEach((log) => {
      data.push(log.data());
    });
    const doc = XLSX.utils.json_to_sheet(data);
    const new_workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(new_workbook, doc, 'Logs');
    XLSX.writeFile(new_workbook, 'NHCO_Logs.xlsx');
  };

  return (
    <Box width={960} maxWidth="90%" margin="auto">
      <Box>
        <Box padding={2}>
          <Box display="flex" justifyContent="space-between">
            {!isEmpty && isAdmin && (
              <Box width="100%">
                <Button
                  variant="outlined"
                  disableElevation
                  size="small"
                  style={{ marginRight: 5 }}
                  color="primary"
                  onClick={exportLogs}
                >
                  <Archive fontSize="small" style={{ marginRight: 10 }} /> Esporta logs
                </Button>
                <Button
                  variant="outlined"
                  disableElevation
                  size="small"
                  style={{ marginRight: 5 }}
                  color="primary"
                  onClick={() => history.push('/register')}
                >
                  <Contacts fontSize="small" style={{ marginRight: 10 }} /> Gestione farmacie
                </Button>
                <Button
                  variant="outlined"
                  disableElevation
                  size="small"
                  style={{ marginRight: 5 }}
                  color="primary"
                  onClick={() => history.push('/home')}
                >
                  <Description fontSize="small" style={{ marginRight: 10 }} /> Gestione Files
                </Button>
              </Box>
            )}
            {!isEmpty && (
              <Button variant="outlined" disableElevation size="small" onClick={logout} color="primary">
                <ExitToApp fontSize="small" style={{ marginRight: 10 }} /> logout
              </Button>
            )}
          </Box>
          {!isEmpty && <Divider style={{ margin: 10 }} />}
          <Box>{children}</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PageLayout;
