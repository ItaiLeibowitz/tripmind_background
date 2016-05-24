import Ember from 'ember';

import Levenshtein from 'npm:fast-levenshtein'

var distance = function(a,b){
	if (a.length == 0  && b.length == 0) return 0;
	return 1 - Levenshtein.get(a, b) /Math.max(a.length, b.length)
};

var winklerize = function(method, a, b){
	var p = 0.1;
	var d = method(a,b);
	var l = [0,1,2,3].reduce(function(pv, i){
		return pv + (a.slice(0,i) == b.slice(0,i) ? 1 : 0)
	},0);
	return d + p * l * (1-d)
};

var winkler_levenshtein = function(a,b){
	return winklerize(distance,a,b);
};

var compound_distance = function(method, a, b, m){
	var item0Arr = a.split(/\s/),
		item1Arr = b.split(/\s/),
		l0 = item0Arr.length,
		l1 = item1Arr.length;
	if (l0 == 0 || l1 == 0) return 0;
	// calculate the distance matrix once - we then use it twice.
	var distanceMatrix = {};
	item0Arr.forEach(function(word0, i0) {
		item1Arr.forEach(function(word1, i1){
			distanceMatrix[[i0,i1]] = method(word0, word1);
		})
	});


	var indexArr0 = item0Arr.map(function(el, ind){
		return ind
	}),
	indexArr1 = item1Arr.map(function(el, ind){
		return ind
	});
	// calc distance both ways by looking at the max of the matrix in each direction

	var d0 = indexArr0.reduce(function(pv, i0){
		// find the closest word in item1
		return pv + Math.pow(Math.max.apply(null, indexArr1.map(function(i1){
			return distanceMatrix[[i0,i1]];
		})),m)
	},0),
	d1 = indexArr1.reduce(function(pv, i1){
		// find the closest word in item1
		return pv + Math.pow(Math.max.apply(null, indexArr0.map(function(i0){
			return distanceMatrix[[i0,i1]];
		})),m)
	},0);

	return (Math.pow(d0 / l0, 1/m) + Math.pow(d1 / l1, 1.0/m))/2

};

export function initialize(applicationInstance) {
	window.Levenshtein = Levenshtein;
	Levenshtein.distance = distance;
	Levenshtein.lwDistance = winkler_levenshtein;
	Levenshtein.compoundDistance = compound_distance;

};


export default {
	name: 'string-distance',
	initialize: initialize
};