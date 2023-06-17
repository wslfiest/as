import { ClaimsCollection } from "../api/ClaimsCollection";
import { UsersCollection } from "../api/UsersCollection";
import { StatesCollection } from "../api/StatesCollection";

import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

import { ReactiveVar } from 'meteor/reactive-var';
import { ReactiveDict } from 'meteor/reactive-dict';

import { CLAIM_TYPES } from "./Helpers";

import './App.html';
import './normalize.css';
import './App.css';


const STATES = StatesCollection.find({}).fetch();


Template.App_body.onCreated(function helloOnCreated() {
  this.role = new ReactiveVar(5);
});

Template.App_body.helpers({
  role() {
    return Template.instance().role.get();
  },
});

Template.App_body.events({
  'change .header__role-switcher'(event, instance) {
    Template.instance().role.set(event.target.value);
  },
});

Template.hello.onCreated(function helloOnCreated() {
  this.counter = new ReactiveVar(100);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});


Template.mainTemplateDb.helpers({
  claims() {
    return ClaimsCollection.find({});
  }
})



// mainTemplateClaims — страница с заявками

Template.mainTemplateClaims.onCreated(function () {
  this.q = new ReactiveDict();
})

const QUERY = {};




const constructQuery = () => {
  let currentQuery = [];
  let f = document.querySelectorAll('.filter-claims')[0];

  // Filter by id_priority
  let id_priority_query = [];
  if (f.querySelectorAll('.show_priority_1')[0].checked) id_priority_query.push({id_priority: 1});
  if (f.querySelectorAll('.show_priority_2')[0].checked) id_priority_query.push({id_priority: 2});
  if (f.querySelectorAll('.show_priority_3')[0].checked) id_priority_query.push({id_priority: 3});
  if (id_priority_query.length > 0) {
    id_priority_query = {$or: id_priority_query};
    currentQuery.push(id_priority_query);
  }

  // Filter by id_type_claim
  let id_type_claim_query = [];
  if (f.querySelectorAll('.show_type_1')[0].checked) id_type_claim_query.push({id_type_claim: 1});
  if (f.querySelectorAll('.show_type_2')[0].checked) id_type_claim_query.push({id_type_claim: 2});
  if (f.querySelectorAll('.show_type_3')[0].checked) id_type_claim_query.push({id_type_claim: 3});
  if (f.querySelectorAll('.show_type_4')[0].checked) id_type_claim_query.push({id_type_claim: 4});
  if (f.querySelectorAll('.show_type_5')[0].checked) id_type_claim_query.push({id_type_claim: 5});
  if (id_type_claim_query.length > 0) {
    id_type_claim_query = {$or: id_type_claim_query};
    currentQuery.push(id_type_claim_query);
  }

  // Filter by id_state
  let id_state_query = [];
  if (f.querySelectorAll('.show_state_1')[0].checked) id_state_query.push({id_state: 1});
  if (f.querySelectorAll('.show_state_2')[0].checked) id_state_query.push({id_state: 2});
  if (f.querySelectorAll('.show_state_3')[0].checked) id_state_query.push({id_state: 3});
  if (f.querySelectorAll('.show_state_4')[0].checked) id_state_query.push({id_state: 4});
  if (f.querySelectorAll('.show_state_5')[0].checked) id_state_query.push({id_state: 5});
  if (f.querySelectorAll('.show_state_6')[0].checked) id_state_query.push({id_state: 6});
  if (f.querySelectorAll('.show_state_7')[0].checked) id_state_query.push({id_state: 7});
  if (id_state_query.length > 0) {
    id_state_query = {$or: id_state_query};
    currentQuery.push(id_state_query);
  }

  return currentQuery;
}



Template.mainTemplateClaims.events({
  "click .filter"(event, instance) {
    instance.q.set(QUERY, constructQuery());
  },
  'click .filter-claims__header'(eveent, instance) {
    document.querySelectorAll('.filter-claims__canvas')[0].classList.toggle('helper__hidden');
  }
})

Template.mainTemplateClaims.helpers({

  claims() {
    const instance = Template.instance();
    let query = instance.q.get(QUERY) || [{}];
    if (query.length > 0) {
      query = {$and: query};
      console.log(query);
      return ClaimsCollection.find(query, { sort: { id: -1 }, limit: 9999 }).fetch();
    }
    return [];
  },

  user(index) {
    return UsersCollection.find({id:index});
  },

  userName(index) {
    const user = UsersCollection.findOne({id:index});
    const name = user.name;
    const patronymic = user.patronymic;
    const surname = user.surname;
    const system_number = user.system_number;
    return name + ' ' + patronymic + ' ' + surname + ' ' + '(таб. ' + system_number + ')';
  },

  type(i) {
    return CLAIM_TYPES[i]['short'];
  },

  priorityClass(i) {
    const priorityClasses = [
      'claim--high-priority',
      'claim--mid-priority',
      'claim--low-priority',
    ];
    return priorityClasses[i-1];
  },

  prettyDate(stringDate) {
    const date = new Date(stringDate);
    return date.toLocaleString();
  },

  statusName(i) {

  }
})

// mainTemplateAdd

const getSlaTime = (id_type_claim, id_priority) => {
  let slaTime = 666;

  if ((id_type_claim === 1) && (id_priority === 1)) slaTime = 4 * 60;
  if ((id_type_claim === 1) && (id_priority === 2)) slaTime = 24 * 60;
  if ((id_type_claim === 1) && (id_priority === 3)) slaTime = 2*24 * 60;

  if ((id_type_claim === 2) && (id_priority === 1)) slaTime = 2 * 60;
  if ((id_type_claim === 2) && (id_priority === 2)) slaTime = 4 * 60;
  if ((id_type_claim === 2) && (id_priority === 3)) slaTime = 24 * 60;

  if ((id_type_claim === 3) && (id_priority === 1)) slaTime = 4 * 60;
  if ((id_type_claim === 3) && (id_priority === 2)) slaTime = 2*24 * 60;
  if ((id_type_claim === 3) && (id_priority === 3)) slaTime = 4*24 * 60;

  if ((id_type_claim === 4) && (id_priority === 1)) slaTime = 24 * 60;
  if ((id_type_claim === 4) && (id_priority === 2)) slaTime = 5*24 * 60;
  if ((id_type_claim === 4) && (id_priority === 3)) slaTime = 10*24 * 60;

  if ((id_type_claim === 5) && (id_priority === 1)) slaTime = 24 * 60;
  if ((id_type_claim === 5) && (id_priority === 2)) slaTime = 2*24 * 60;
  if ((id_type_claim === 5) && (id_priority === 3)) slaTime = 5*24 * 60;

  return slaTime;
}

Template.mainTemplateAdd.events({
  "submit .form"(event) {
    event.preventDefault();
    const target = event.target;

    const currentDate = new Date()
    const slaInMin = getSlaTime(Number(target.type.value), Number(target.priority.value));
    const slaInMs = slaInMin * 60 * 60 * 1000;

    const claim = {
      id: Number(document.querySelectorAll('#maxId')[0].innerText) + 1,
      create_date: currentDate.toISOString(),
      id_type_claim: Number(target.type.value),
      text: target.text.value,
      id_priority: Number(target.priority.value),
      time_according_sla: slaInMin,
      id_state: 1, //
      state: 'В обработке',
      place_of_service: target.place.value,
      date_time_edit_state: currentDate.toISOString(),
      date_time_close_claim: null,
      id_autor: 1, // TODO: реализовать аутентификацию или псевдо
      id_executor: null,
    //  new Date(currentDate.getTime() + slaInMs).toISOString()
    }

    ClaimsCollection.insert(claim);
    alert('Задача принята в обработку!');
    FlowRouter.go('claims');

  }
});

Template.mainTemplateAdd.helpers({
  maxId() {
    const lastclaim = ClaimsCollection.find({}, {limit: 1, sort: {id: -1}}).fetch()[0];
    console.log(lastclaim.id);
    return lastclaim.id;
  },
});