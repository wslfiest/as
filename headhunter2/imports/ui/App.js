import { ResumesCollection } from "../api/ResumesCollection";
import { VacanciesCollection } from "../api/VacanciesCollection";

import './App.html';
import './Login.js'

const getUser = () => {
    console.log (Meteor.user());
    return Meteor.user();
}

const isUserLogged = () => !!getUser();

Template.mainContainer.helpers({
    isUserLogged(){
        return isUserLogged();
    },
    vacancies() {
        return VacanciesCollection.find({}).fetch();
    },
    resumes() {
        return ResumesCollection.find({}).fetch();
    },
});

Template.mainContainer.events({
    'click .user'() {
        Meteor.logout();
      }
});