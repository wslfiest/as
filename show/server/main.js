import { Meteor } from 'meteor/meteor';

import { ClaimsCollection } from "../imports/api/ClaimsCollection.js";
import { UsersCollection } from "../imports/api/UsersCollection.js";
import { StatesCollection } from "../imports/api/StatesCollection.js";

import { ClaimsInitialData } from "./fixturesClaims";
import { UsersInitialData } from "./fixturesUsers";
import { StatesInitialData } from "./fixturesStates";

const insertItem = (collection, item) => collection.insert(item);

Meteor.startup(() => {

  ClaimsCollection.remove({});
  UsersCollection.remove({});

  if (ClaimsCollection.find().count() === 0) {
    for (let i = 0; i < ClaimsInitialData.length; i++) {
      insertItem(ClaimsCollection, ClaimsInitialData[i]);
    }
  }

  if (UsersCollection.find().count() === 0) {
    for (let i = 0; i < UsersInitialData.length; i++) {
      insertItem(UsersCollection, UsersInitialData[i]);
    }
  }

  if (StatesCollection.find().count() === 0) {
    for (let i = 0; i < StatesInitialData.length; i++) {
      insertItem(StatesCollection, StatesInitialData[i]);
    }
  }
});
