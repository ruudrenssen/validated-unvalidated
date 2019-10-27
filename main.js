let validatedData = {
	'rows':[
		{
			'title': { 'value': 'first row', 'type': 'title'},
			'first column': { 'value': null, 'type': 'validated'},
			'second column': { 'value': null, 'type': 'validated'},
			'third column': { 'value': null, 'type': 'validated'}
		},
		{
			'title': { 'value': 'second row', 'type': 'title'},
			'first column': { 'value': 100, 'type': 'validated'},
			'second column': { 'value': null, 'type': 'validated'},
			'third column': { 'value': 300, 'type': 'validated'}
		},
		{
			'title': { 'value': 'third row', 'type': 'title'},
			'first column': { 'value': 100, 'type': 'validated'},
			'second column': { 'value': 200, 'type': 'validated'},
			'third column': { 'value': 300, 'type': 'validated'}
		}
	]
}
let unvalidatedData = {
	'rows':[
		{
			'title': { 'value': 'first row', 'type': 'title'},
			'first column': { 'value': 1000, 'type': 'unvalidated'},
			'second column': { 'value': 2000, 'type': 'unvalidated'},
			'third column': { 'value': 3000, 'type': 'unvalidated'}
		},
		{
			'title': { 'value': 'second row', 'type': 'title'},
			'first column': { 'value': 1000, 'type': 'unvalidated'},
			'second column': { 'value': 2000, 'type': 'unvalidated'},
			'third column': { 'value': 3000, 'type': 'unvalidated'}
		},
		{
			'title': { 'value': 'third row', 'type': 'title'},
			'first column': { 'value': 1000, 'type': 'unvalidated'},
			'second column': { 'value': 2000, 'type': 'unvalidated'},
			'third column': { 'value': 3000, 'type': 'unvalidated'}
		}
	]
}
let combinedData = DataUtilities.combineData(validatedData, unvalidatedData);
let view = new View(document.body, combinedData);

