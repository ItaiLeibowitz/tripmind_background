import Ember from 'ember';
import DS from "ember-data";
import WithItemImage from 'tripmind-background/mixins/with_item_image';
import WithAncestry from 'tripmind-background/mixins/with_ancestry';
import ModelWithDescs from 'tripmind-background/mixins/model_with_descs';
import Constants from 'tripmind-background/appconfig/constants';
import Utils from 'tripmind-background/appconfig/utils';

var Item = DS.Model.extend(WithItemImage, WithAncestry, ModelWithDescs, {
	name: DS.attr('string'),
	category: DS.attr('string'),
	captionName: DS.attr('string'),
	captionLink: DS.attr('string'),
	captionCc: DS.attr('string'),
	image: DS.attr('string'),
	address: DS.attr('string'),
	ancestry: DS.attr('string'),
	ancestryDepth: DS.attr('number'),
	ancestryNames: DS.attr('string'),
	duration: DS.attr('number', {defaultValue: 3600}),
	lat: DS.attr('number'),
	lng: DS.attr('number'),
	boundSwLat: DS.attr('number'),
	boundSwLng: DS.attr('number'),
	boundNeLat: DS.attr('number'),
	boundNeLng: DS.attr('number'),
	userId: DS.attr('number'),
	itemType: DS.attr('string'),
	operatingHours: DS.attr(),
	externalLinks: DS.attr(),
	phone: DS.attr('string'),
	rating: DS.attr('number', {defaultValue: 3}),
	source: DS.attr('string'),
	price: DS.attr('string'),
	openingHoursText: DS.attr('string'),
	topItems: DS.attr('number'),
	isHighlight: DS.attr('boolean', {defaultValue: false}),
	canHaveChildren: DS.attr('boolean'),
	hasSuggestedTrips: DS.attr('boolean'),
	isEditLocked: DS.attr('boolean', {defaultValue: false}),
	//collection: DS.belongsTo('collection', {inverse: 'items'}),
	//trip: DS.belongsTo('trip', {inverse: 'items'}),
	//potentialTrip: DS.belongsTo('trip', {inverse: 'potentialItems'}),
	parent: DS.belongsTo('item'),
	gmapsReference: DS.attr('string'),
	isGoogle: DS.attr('boolean', {defaultValue: false}),
	isHidden: DS.attr('boolean', {defaultValue: false}),
	additionalInfoComplete: DS.attr('boolean', {defaultValue: false}),
	needsWikiContent: DS.attr('boolean'),
	needsFullGoogleInfo: DS.attr('boolean'),
	imageBaseUrl: DS.attr('string'),
	imageProvider: DS.attr('number'),
	reviewDigest: DS.attr('number'),
	googleResultOrder: DS.attr('number'),
	googleTypes: DS.attr(),
	ancestryObject: DS.attr(),
	parentOptions: DS.attr(),
	recentlyUpdated: DS.attr('boolean', {defaultValue: false}),
	trackingStatus: DS.attr('boolean', {defaultValue: true}),
	trippointsCount: DS.attr('number'),
	destinationRoute: 'item.overview',

	imageUrl: Ember.computed.alias('itemImageUrl'),
	imageStyle: Ember.computed.alias('itemImageStyle'),

	photoStyle: function(){
		if (this.get('image')) {
			return `background-image: url(${this.get('image')})`;
		} else {
			var colorLength = Constants.FLAT_DESIGN_COLORS.length,
				color = Constants.FLAT_DESIGN_COLORS[Math.floor(Math.random()*colorLength)];
			return `backgrounSd-image: url('assets/images/background-pattern.png'); background-color: ${color};`
		}
	}.property('image'),

	itemTypeName: function(){
		return Constants.ITEM_TYPES_ARRAY[this.get('itemType')] ? Constants.ITEM_TYPES_ARRAY[this.get('itemType')].name.capitalize() : 'Attraction';
	}.property('itemType'),

	slug: function(){
		return [this.get('id').toString(), this.get('name').toLowerCase()].join(' ').replace(/ /g, '+');
	}.property('id', 'name'),

	reviewedByArray: function(){
		var reviewDigest = this.get('reviewDigest');
		if (!reviewDigest) return;
		var reviewsArray = reviewDigest.toString(2).split("").reverse();
		return reviewsArray.map(function(el, index){
			return el == 1 ? {class: "review_source_" + index} : null;
		}).compact()
	}.property('reviewDigest'),


	isRegion: function(){
		return Utils.itemTypeIsRegion(this.get('itemType'));
	}.property('itemType'),


	websiteLink: function(){
		var links = this.get('externalLinks');
		if (links && links.length > 0) {
			return links[0]["source"];
		}
	}.property('externalLinks'),

	mapLink: function(){
		return `http://maps.google.com/maps?daddr=${this.get('latitude')},${this.get('longitude')}&amp;ll=`;
	}.property('latitude', 'longitude'),

	phoneLink: function(){
		return `tel:${this.get('phone')}`;
	}.property('phone'),


});

export default Item;