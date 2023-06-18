import { EmployeesCollection } from "../imports/api/collections/EmployeesCollection.js";
import { PositionsCollection } from "../imports/api/collections/PositionsCollection.js";
import { StaffUnitsCollection } from "../imports/api/collections/StaffUnitsCollection.js";

import { EmployeesInitialData } from "./fixtures/fixturesEmployees.js";
import { PositionsInitialData } from "./fixtures/fixturesPositions.js";
import { StaffUnitsInitialData } from "./fixtures/fixturesStaffUnits.js";
import { UsersInitialData } from './fixtures/fixturesUsers.js';



const insertItem = (collection, item) => collection.insert(item);

const populateUsersCollection = () => {
  for (i in UsersInitialData) {
    if (!Accounts.findUserByUsername(UsersInitialData[i].username)){
      Accounts.createUser({
        username: UsersInitialData[i].username,
        password: UsersInitialData[i].password,
        email: UsersInitialData[i].email,
        profile: UsersInitialData[i].profile,
      });
    }
  }
}

const populateEmployeesCollection = () => {
  EmployeesCollection.remove({});
  if (EmployeesCollection.find().count() === 0) {
    for (let i = 0; i < EmployeesInitialData.length; i++) {
      insertItem(EmployeesCollection, EmployeesInitialData[i]);
    }
  }
};

const populatePositionsCollection = () => {
  PositionsCollection.remove({});
  if (PositionsCollection.find().count() === 0) {
    for (let i = 0; i < PositionsInitialData.length; i++) {
      insertItem(PositionsCollection, PositionsInitialData[i]);
    }
  }
};

const populateStaffUnitsCollection = () => {
  StaffUnitsCollection.remove({});
  if (StaffUnitsCollection.find().count() === 0) {
    for (let i = 0; i < StaffUnitsInitialData.length; i++) {
      insertItem(StaffUnitsCollection, StaffUnitsInitialData[i]);
    }
  }
};

Meteor.startup(() => {
  populateUsersCollection();
  populateEmployeesCollection();
  populatePositionsCollection();
  populateStaffUnitsCollection();
});