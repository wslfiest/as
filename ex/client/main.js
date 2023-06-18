import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { PositionsCollection } from '/imports/api/collections/PositionsCollection';

import '../imports/ui/dashboard/Dashboard.js';
import '../imports/ui/staffunits/StaffUnits.js';
import '../imports/ui/candidates/Candidates.js';
import '../imports/ui/staffunit/StaffUnit.js';

FlowRouter.route('/', {
  name: 'start',
  action() {
    FlowRouter.go('dashboard');
  },
});

FlowRouter.route('/dashboard', {
  name: 'dashboard',
  action() {
    BlazeLayout.render('Dashboard', {});
  },
});

FlowRouter.route('/login', {
  name: 'login',
  action() {
    BlazeLayout.render('Login', {});
  },
});

FlowRouter.route('/staff-unit/:id', {
  name: 'staffUnit',
  action(params) {
    const id = params.id;
    BlazeLayout.render('StaffUnit', {id: id});
  },
});

Template.registerHelper('positionNameByPositionId', (positionId) => {
  return PositionsCollection.findOne({id: positionId}).name;
});

Template.registerHelper('trimmedId', (id) => {
  return id.split('-')[0];
});