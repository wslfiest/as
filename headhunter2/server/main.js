import { Meteor } from 'meteor/meteor';

import { ResumesCollection } from "../imports/api/ResumesCollection.js";
import { VacanciesCollection } from "../imports/api/VacanciesCollection.js";

import { ResumesInitialData } from "./fixturesResumes.js";
import { VacanciesInitialData } from "./fixturesVacancies.js";
import { UsersInitialData } from "./fixturesUsers.js";

const insertItem = (collection, item) => collection.insert(item);

Meteor.startup(() => {
  for (i in UsersInitialData) {
    if (!Accounts.findUserByUsername(UsersInitialData[i].username)){
      Accounts.createUser({
        username: UsersInitialData[i].username,
        password: UsersInitialData[i].password,
      });
    }
  }

  ResumesCollection.remove({});
  VacanciesCollection.remove({});

  if (ResumesCollection.find().count() === 0) {
    for (let i = 0; i < ResumesInitialData.length; i++) {
      insertItem(ResumesCollection, ResumesInitialData[i]);
    }
  }

  if (VacanciesCollection.find().count() === 0) {
    for (let i = 0; i < VacanciesInitialData.length; i++) {
      insertItem(VacanciesCollection, VacanciesInitialData[i]);
    }
  }
});

