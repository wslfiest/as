import { StaffUnitsCollection } from '/imports/api/collections/StaffUnitsCollection';

import './StaffUnits.html';
import './StaffUnits.css';

Template.StaffUnits.helpers({
    staffunits() { 
        return StaffUnitsCollection.find({});
    },
});

Template.staffUnit.helpers({
    statusNameByStatus(status) {
        const Statuses = {
            'Opened': 'Открытая',
            'Pending': 'Почти закрытая',
            'Closed': 'Закрытая',
        }
        return Statuses[status];
    }
});
