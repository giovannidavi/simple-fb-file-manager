import {
  Box,
  Button,
  Dialog,
  Typography,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Paper,
  Select,
  TextField,
  Divider,
} from '@material-ui/core';
import { Add, Delete, VisibilityOff } from '@material-ui/icons';
import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import AdminMenu from '../components/organisms/AdminFilesMenu';
import PageLayout from '../components/organisms/PageLayout';
import { useAuthentication, useMedia } from '../hooks';

const Upload: React.FC = () => {
  const [files, setFiles] = useState<File[]>();
  const [open, setOpen] = useState(false);
  const { uploadMedia, loading, loaded } = useMedia();
  const {
    profile: { isAdmin },
  } = useAuthentication();
  const inputRef = useRef<any>();

  const sendFile = () => {
    if (files) {
      uploadMedia({ path: '/documents', file: files[0] });
    }
  };

  useEffect(() => {
    if (loaded && inputRef && inputRef.current) {
      (inputRef as any).current.value = '';
    }
  }, [loaded]);

  return (
    <PageLayout>
      {isAdmin && <AdminMenu />}

      <Box paddingY={2}>
        <Paper variant="outlined">
          <Box padding={2}>
            <Box paddingBottom={2}>
              {loading && <LinearProgress />}
              {loaded && <small>File uploaded</small>}
            </Box>
            <Box paddingBottom={1} display="flex" justifyContent="space-between">
              <Button
                variant="contained"
                size="small"
                color="primary"
                disableElevation
                onClick={() => inputRef.current.click()}
              >
                Seleziona files
              </Button>

              <Button
                variant="contained"
                size="small"
                color="primary"
                disableElevation
                onClick={sendFile}
                disabled={!files?.length}
              >
                Carica
              </Button>
            </Box>
            <Box display="none">
              <input type="file" onChange={(e: any) => setFiles(e.target.files)} ref={inputRef} multiple />
            </Box>
            <Box paddingY={3}>
              {files &&
                files.length &&
                Array.from(files).map((file) => (
                  <Box paddingY={1} display="flex" alignItems="center" key={file.name}>
                    <Box width="100%">{file.name}</Box>
                    <Box width="300px">
                      <FormControl fullWidth variant="filled" color="primary" size="small">
                        <InputLabel id="demo-simple-select-label">Seleziona categoria</InputLabel>
                        <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Seleziona categoria">
                          <Box p={1}>
                            <Button
                              fullWidth
                              onClick={() => setOpen(true)}
                              variant="contained"
                              color="primary"
                              size="small"
                              disableElevation
                            >
                              <Add fontSize="small" /> Aggiungi categoria
                            </Button>
                          </Box>
                          <MenuItem value={10}>Categoria 1</MenuItem>
                          <MenuItem value={20}>Categoria 2</MenuItem>
                          <MenuItem value={30}>Categoria 3</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                    <Button color="primary" size="small" disableElevation style={{ marginLeft: 5 }}>
                      <VisibilityOff />
                    </Button>
                    <Button color="primary" size="small" disableElevation style={{ marginLeft: 5 }}>
                      <Delete />
                    </Button>
                  </Box>
                ))}
            </Box>
            <Dialog open={open} onClose={() => setOpen(false)} hideBackdrop>
              <Box p={3} width="300px">
                <Typography variant="h6">Aggiungi categoria</Typography>
                <Divider style={{ margin: '10px 0' }} />
                <TextField label="Nome categoria" fullWidth />
                <Box height={10} />
                <Button size="small" variant="outlined">
                  Aggiungi
                </Button>
              </Box>
            </Dialog>
          </Box>
        </Paper>
      </Box>
    </PageLayout>
  );
};

export default Upload;
