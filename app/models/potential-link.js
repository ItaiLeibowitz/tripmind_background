import Ember from 'ember';
import DS from "ember-data";

export default DS.Model.extend({
	createdAt: DS.attr('string'),
	lastVisited: DS.attr('string'),
	note: DS.attr('string'),
	image: DS.attr('string'),
	title: DS.attr('string'),
	description: DS.attr('string'),
	item: DS.belongsTo('item')
});


