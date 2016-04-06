import Ember from 'ember';


export function initialize(applicationInstance) {
	let store = applicationInstance.lookup('service:store');
	let itemDetailsService = applicationInstance.lookup('service:item-details-service');
	window.TripmindStore = store;
	window.ItemDetailsService = itemDetailsService;
};


export default {
	name: 'access-store',
	initialize: initialize
};