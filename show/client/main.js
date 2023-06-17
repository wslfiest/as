import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import '../imports/ui/App.js';

FlowRouter.route('/', {
  name: 'start',
  action() {
    FlowRouter.go('claims');
  }
});

FlowRouter.route('/team', {
  name: 'team',
  action() {
    BlazeLayout.render('App_body', {main: 'mainTemplateMain'});
  }
});

FlowRouter.route('/team/kb', {
  name: 'kb',
  action() {
    BlazeLayout.render('App_body', {main: 'mainTemplateKb'});
  }
});

FlowRouter.route('/claims', {
  name: 'claims',
  action() {
    BlazeLayout.render('App_body', {main: 'mainTemplateClaims'});
  }
});

FlowRouter.route('/db', {
  name: 'db',
  action() {
    BlazeLayout.render('App_body', {main: 'mainTemplateDb'});
  }
});

FlowRouter.route('/add', {
  name: 'add',
  action() {
    BlazeLayout.render('App_body', {main: 'mainTemplateAdd'});
  }
});

//
// FlowRouter.route('/action', {
//   name: 'Lists.show',
//   action(params, queryParams) {
//     console.log("Looking at a list?");
//   }
// });