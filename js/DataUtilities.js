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
}