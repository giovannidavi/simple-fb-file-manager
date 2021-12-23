import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Chip,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import { CloudDownload, InsertDriveFile, Link } from '@material-ui/icons';
import React from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { useFirestore } from 'react-redux-firebase';
import { useAuthentication } from '../hooks';
import PageLayout from '../components/organisms/PageLayout';
import AdminMenu from '../components/organisms/AdminFilesMenu';

const Home: React.FC = () => {
  const [docs, setDocs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const {
    profile: { email, isAdmin },
  } = useAuthentication();
  const firestore = useFirestore();

  const getDocs = useCallback(async () => {
    setLoading(true);
    const medias = await (await firestore.collection('media').get()).docs;
    setDocs(medias.map((media) => media.data()));
    setLoading(false);
  }, [firestore]);

  useEffect(() => {
    getDocs();
  }, [getDocs]);

  const handleDownload = async (doc: any) => {
    await firestore
      .collection('logs')
      .add({ doc: doc.metadata.name, email, action: 'download', date: new Date().toISOString() });
    var url = doc.url;
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function () {
      var a = document.createElement('a');
      a.href = window.URL.createObjectURL(xhr.response);
      a.download = doc.metadata.name; // Name the file anything you'd like.
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
    };
    xhr.open('GET', url);
    xhr.send();
  };

  const handleView = async (doc: any) => {
    await firestore
      .collection('logs')
      .add({ doc: doc.metadata.name, email, action: 'view', date: new Date().toISOString() });
    window.open(doc.url);
  };

  const isImage = (doc: any) => doc.metadata.contentType.indexOf('image/') === 0;

  return (
    <PageLayout>
      {isAdmin && <AdminMenu />}
      {loading && <LinearProgress />}
      <Divider style={{ margin: '20px 0' }} />
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Button variant="contained" color="primary" disableElevation fullWidth style={{ marginBottom: 10 }}>
            <Box display="flex" justifyContent="space-between" width="100%">
              Categoria 1
              <Chip label={docs.length} color="secondary" size="small" />
            </Box>
          </Button>
          <Button variant="outlined" color="primary" disableElevation fullWidth style={{ marginBottom: 10 }} disabled>
            <Box display="flex" justifyContent="space-between" width="100%">
              Categoria 2
              <Chip label="0" color="primary" size="small" />
            </Box>
          </Button>
          <Button variant="outlined" color="primary" disableElevation fullWidth style={{ marginBottom: 10 }} disabled>
            <Box display="flex" justifyContent="space-between" width="100%">
              Categoria 3
              <Chip label="0" color="primary" size="small" />
            </Box>
          </Button>
        </Grid>
        <Grid item xs={9} style={{ maxHeight: 500, overflowY: 'auto' }}>
          <List>
            {docs.map((doc) => (
              <div>
                <ListItem>
                  <ListItemAvatar>
                    {isImage(doc) ? (
                      <Avatar
                        variant="square"
                        alt={doc.name}
                        src={doc.url}
                        style={{ width: 50, height: 50, marginRight: 20, border: '1px solid black' }}
                      />
                    ) : (
                      <Avatar variant="square" style={{ width: 50, height: 50, marginRight: 20 }}>
                        <InsertDriveFile style={{ width: 30, height: 30 }} />
                      </Avatar>
                    )}
                  </ListItemAvatar>
                  <ListItemText
                    style={{ paddingRight: 110 }}
                    primary={doc.metadata.name}
                    secondary={doc.metadata.timeCreated}
                  />
                  <ListItemSecondaryAction>
                    <IconButton onClick={() => handleDownload(doc)}>
                      <CloudDownload />
                    </IconButton>
                    <IconButton onClick={() => handleView(doc)}>
                      <Link />
                    </IconButton>
                    |
                    <Checkbox color="primary" />
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider variant="inset" component="li" />
              </div>
            ))}
          </List>
        </Grid>
      </Grid>
    </PageLayout>
  );
};

export default Home;
