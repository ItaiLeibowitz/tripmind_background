import Ember from 'ember';
import sanitizeHtml from 'npm:sanitize-html';


export function initialize(applicationInstance) {
	let store = applicationInstance.lookup('service:store');
	let itemDetailsService = applicationInstance.lookup('service:item-details-service');
	window.TripmindStore = store;
	window.ItemDetailsService = itemDetailsService;
	window.sanitizeHtml = sanitizeHtml;
};


export default {
	name: 'access-services',
	initialize: initialize
};