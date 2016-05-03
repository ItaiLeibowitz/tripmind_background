import Ember from 'ember';
import sanitizeHtml from 'npm:sanitize-html';
import promiseFromAjax from 'tripmind-background/mixins/promise_from_ajax';
import Constants from 'tripmind-background/appconfig/constants';


export function initialize(applicationInstance) {
	let store = applicationInstance.lookup('service:store');
	let itemDetailsService = applicationInstance.lookup('service:item-details-service');
	window.TripmindStore = store;
	window.ItemDetailsService = itemDetailsService;
	window.sanitizeHtml = sanitizeHtml;
	window.promiseFromAjax = promiseFromAjax;
	window.TmConstants = Constants;
};


export default {
	name: 'access-services',
	initialize: initialize
};