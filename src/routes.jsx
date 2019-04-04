import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import Admin from './components/admin';
import CrewAdmin from './components/crew_admin';
import MTVMeleeOverlay from './components/overlays/mtv_melee';
import MTVMeleeDubs from './components/overlays/mtv_dubs';
import MTVMeleeCrew from './components/overlays/mtv_crew';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Admin} />
    <Route path='overlays/mtv_melee' component={MTVMeleeOverlay} />
    <Route path='overlays/mtv_dubs' component={MTVMeleeDubs} />
    <Route path='overlays/mtv_crew' component={MTVMeleeCrew} />
    <Route path='crew_admin' component={CrewAdmin} />
    <Route path='*' component={Admin} />
  </Route>
);
