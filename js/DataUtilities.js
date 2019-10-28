class DataUtilities {
	static combineData(validatedData, unvalidatedData) {
		// combine the set of validated and unvalidated data
		let combinedData = {};
		let rows = [];

		combinedData['rows'] = rows;
		validatedData['rows'].forEach((rowData, rowNumber) => {
			let combinedRow = {};

			for (let cellData in rowData) {
				combinedRow[cellData] = {};

				// validated data available?
				if(rowData[cellData]['value'] !== null) {
					combinedRow[cellData] = validatedData['rows'][rowNumber][cellData];
				} else {
					combinedRow[cellData] = unvalidatedData['rows'][rowNumber][cellData];
				}
			}
			rows.push(combinedRow);
		});

		return combinedData;
	}

	static subset(dataset, end, start = 0) {
		let data = Object.assign({}, dataset);
		let rows = [];
		for(let i = start; i < end; i++) {
			rows.push(data['rows'][i]);
		}
		data['rows'] = rows;
		return data;
	}

	static rowTitles(dataset) {
		let titles = [];
		dataset['rows'].forEach(row => {
			titles.push(row.title.value);
		});
		return(titles);
	}

	static TotalRow(row) {
		let total = 0;
		for(let item in row) {
			if(row[item].type !== 'title') {
				total += row[item].value;
			}
		}
		return total;
	}
}