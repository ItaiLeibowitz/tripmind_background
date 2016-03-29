import Ember from 'ember';


export function initialize(applicationInstance) {
	let store = applicationInstance.lookup('service:store');
	window.TripmindStore = store;
};


export default {
	name: 'access-store',
	initialize: initialize
};