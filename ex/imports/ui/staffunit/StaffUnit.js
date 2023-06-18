import './StaffUnit.html';
import './StaffUnit.css';

import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { StaffUnitsCollection } from '/imports//api/collections/StaffUnitsCollection';

Template.StaffUnit.helpers({
    unit() {
        const id = FlowRouter.getParam('id');
        return StaffUnitsCollection.findOne({id: id});
    }
})