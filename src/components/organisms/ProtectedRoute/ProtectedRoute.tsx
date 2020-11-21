import React from 'react';
import {
  Route,
  Redirect,
  RouteProps,
  RouteComponentProps,
} from 'react-router-dom';
import { useAuthentication } from '../../../hooks';

type Props = RouteProps & {
  component:
  | React.ComponentType<RouteComponentProps<any>>
  | React.ComponentType<any>;
  authenticated?: boolean;
  authorized?: boolean;
};

const PrivateRoute: React.FC<Props> = ({
  component: Component,
  authenticated = true,
  authorized = true,
  ...rest
}) => {
  const { isAuthenticated, loaded } = useAuthentication();
  const condition = (authenticated ? isAuthenticated : !isAuthenticated) && authorized;
  const redirect = authenticated ? '/login' : '/home';

  if (!loaded) {
    return null;
  }
  return (
    <Route
      {...rest}
      render={props =>
        condition ? <Component {...props} /> : <Redirect to={redirect} />
      }
    />
  );
};

export default PrivateRoute;
