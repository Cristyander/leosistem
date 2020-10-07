import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import Relacionamento from '../pages/Relacionamento';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/relacionamento" component={Relacionamento} isPrivate />
    </Switch>
  );
}
