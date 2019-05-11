import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor'

export const Items = new Mongo.Collection('items');

Meteor.methods({


    "items.updateItem"(_id,categoryName, items){
        Items.update(_id, {$set:{[categoryName]:items}})
    },

    "items.addCategory"(_id, categoryName){
        Items.update(_id, {$set:{[categoryName]:{}}})
    }
})