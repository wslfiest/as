import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '../imports/api/TasksColletion';

const insertTask = taskText => TasksCollection.insert({ text: taskText });

const SEED_USERNAME = "admin";
const SEED_PASSWORD = "admin";

Meteor.startup(() => {
  if(!Accounts.findByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  };

  if (TasksCollection.find().count() === 0) {
    [
      'First Task',
      'Second Task',
      'Third Task',
    ].forEach(insertTask)
  };
});
