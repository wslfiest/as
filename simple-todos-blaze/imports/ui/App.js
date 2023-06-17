import { Template } from 'meteor/templating';
import { TasksCollection } from '../api/TasksColletion';
import { ReactiveDict } from 'meteor/reactive-dict';

import './App.html';
import './Task.html';
import './Task.js'

const HIDE_COMPLETED_STRING = "hideCompleted";

Template.mainContainer.onCreated(function mainContainerOnCreated() {
    this.state = new ReactiveDict();
});

Template.mainContainer.helpers({
    tasks() {
        const instance = Template.instance();
        const hideCompleted = instance.state.get(HIDE_COMPLETED_STRING);
    
        const hideCompletedFilter = { isChecked: { $ne: true } };

        return TasksCollection.find(hideCompleted ? hideCompletedFilter : {}, 
            { sort: { createdAt: -1 } }).fetch();
    },
    hideCompleted() {
        return Template.instance().state.get(HIDE_COMPLETED_STRING);
    },
    incompleteCount() {
        const incompleteTasksCount = TasksCollection.find({ isChecked: { $ne: true } }).count();
        return incompleteTasksCount ? `(${incompleteTasksCount})` : '';
      },
});

Template.mainContainer.events({
    "click #hide-completed-button"(event, instance) {
        const currentHideCompleted = instance.state.get(HIDE_COMPLETED_STRING);
        instance.state.set(HIDE_COMPLETED_STRING, !currentHideCompleted);
    },
});

Template.form.events({
    "submit .task-form"(event) {
        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form element
        const target = event.target;
        const text = target.text.value;

        // Insert a task into the collection
        TasksCollection.insert({
            text,
            createdAt: new Date(), // current time
        });

        // Clear form
        target.text.value = '';
    }
});