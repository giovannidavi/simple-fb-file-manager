import {
  Avatar,
  Box,
  Checkbox,
  Divider,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import { useFirestore } from 'react-redux-firebase';
import { LoginBox } from '../components/organisms';
import AdminMenu from '../components/organisms/AdminPharmaMenu';
import PageLayout from '../components/organisms/PageLayout';
import { useAuthentication } from '../hooks';

const Register: React.FC = () => {
  const [openRegister, setOpenRegister] = useState(false);
  const toggleRegister = () => setOpenRegister(!openRegister);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const firestore = useFirestore();

  const {
    profile: { isAdmin },
  } = useAuthentication();

  const getUsers = useCallback(async () => {
    setLoading(true);
    const res = await (await firestore.collection('users_meta').get()).docs;
    setUsers(res.map((user) => user.data()));

    setLoading(false);
  }, [firestore]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <PageLayout>
      {isAdmin && <AdminMenu onAddUser={toggleRegister} />}
      {loading && <LinearProgress />}
      {openRegister && (
        <Box paddingY={2}>
          <LoginBox showRegister />
        </Box>
      )}
      <List>
        {users &&
          users.map((user) => (
            <div>
              <ListItem>
                <ListItemAvatar>
                  <Avatar variant="square" style={{ width: 50, height: 50, marginRight: 20 }} />
                </ListItemAvatar>
                <ListItemText style={{ paddingRight: 110 }} primary={user.email} secondary={user.email} />
                <ListItemSecondaryAction>
                  <Checkbox color="primary" />
                </ListItemSecondaryAction>
              </ListItem>
              <Divider variant="inset" component="li" />
            </div>
          ))}
      </List>
    </PageLayout>
  );
};

export default Register;
