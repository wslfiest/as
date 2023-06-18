import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './Login.html';
import './Login.css';

Template.LoginForm.events({

    // Событие: если форма отправлена, то пользователь авторизуется
  'submit .login-form'(e) {
    e.preventDefault();

    const target = e.target;

    const username = target.username.value;
    const password = target.password.value;

    Meteor.loginWithPassword(username, password);
  }
});