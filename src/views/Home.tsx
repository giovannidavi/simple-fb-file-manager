import { Avatar, Box, Button, Divider, IconButton, LinearProgress, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Paper } from '@material-ui/core';
import { CloudDownload, InsertDriveFile, Link } from '@material-ui/icons';
import React from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { useFirestore } from 'react-redux-firebase';
import { useHistory } from 'react-router';
import { useAuthentication } from '../hooks';

const Home: React.FC = () => {
  const [docs, setDocs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { logout, profile: { isAdmin, email }, loaded: loadedAuth } = useAuthentication();
  const history = useHistory();
  const firestore = useFirestore();

  const getDocs = useCallback(async () => {
    setLoading(true);
    const medias = await (await firestore.collection('media').get()).docs;
    setDocs(medias.map(media => media.data()))
    setLoading(false);
  }, [firestore])

  useEffect(() => {
    getDocs()
  }, [getDocs])

  const handleDownload = async (doc: any) => {
    await firestore.collection('logs').add({ doc: doc.metadata.name, email, action: 'download', date: new Date().toISOString() })
    var url = doc.url
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
  }

  const handleView = async (doc: any) => {
    await firestore.collection('logs').add({ doc: doc.metadata.name, email, action: 'view', date: new Date().toISOString() })
    window.open(doc.url)
  }

  const isImage = (doc: any) => doc.metadata.contentType.indexOf('image/') === 0;
  return (
    <Box width={500} maxWidth="100%" margin="auto">
      <Paper variant="outlined">
        <Box padding={2}>
          <Button variant="outlined" onClick={logout}>logout</Button>
          <Divider style={{ margin: 10 }} />
          {(loading || !loadedAuth) && <LinearProgress />}
          {isAdmin &&
            <Paper variant="outlined" >
              <Box padding={2}>
                <small>Admin menu</small>
                <Divider style={{ margin: 10 }} />
                <Button variant="outlined" onClick={() => history.push('/register')}>register</Button>
                <Button variant="outlined" onClick={() => history.push('/upload')}>upload</Button>
              </Box>
            </Paper>
          }
          <List>
            {docs.map(doc => (
              <>
                <ListItem>
                  <ListItemAvatar>
                    {isImage(doc) ? <Avatar alt={doc.name} src={doc.url} /> : <Avatar><InsertDriveFile /></Avatar>}
                  </ListItemAvatar>
                  <ListItemText
                    primary={doc.metadata.name}
                    secondary={doc.metadata.timeCreated}
                  />
                  <ListItemSecondaryAction>
                    <IconButton onClick={() => handleDownload(doc)}><CloudDownload /></IconButton>
                    <IconButton onClick={() => handleView(doc)}><Link /></IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider variant="inset" component="li" />
              </>
            ))}
          </List>
        </Box>
      </Paper>
    </Box>
  )
}

export default Home;