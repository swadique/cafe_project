import { Meteor } from 'meteor/meteor';

import '../imports/api/users'
import '../imports/api/people'
import '../imports/api/items'

import { Items } from '../imports/api/items.js';


Meteor.startup(() => {
    Items.allow({ update: () => true });
});
