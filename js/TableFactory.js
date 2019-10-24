class TableFactory {
	static createTable(tableData) {
		let tableEl = document.createElement('table');

		tableData['rows'].forEach((rowData, rowNumber) => {
			tableEl.appendChild(this.createTableRow(rowData, rowNumber));
		});

		return tableEl;
	}

	static createTableRow(rowData, rowNumber = null) {
		let tableRowEl = document.createElement('tr');
		tableRowEl.setAttribute('data-title', rowData['title']['value']);
		tableRowEl.setAttribute('data-row', rowNumber);

		for(let cellData in rowData) {
			tableRowEl.appendChild(this.createTableCell(rowData[cellData], cellData));
		}

		return tableRowEl;
	}

	static createTableCell(cellData, category = null) {
		let elementType = (cellData['type'] == 'title') ? 'th' : 'td';
		let tableCellEl = document.createElement(elementType);

		tableCellEl.setAttribute('data-value', cellData['value']);
		tableCellEl.setAttribute('data-type', cellData['type']);
		tableCellEl.setAttribute('data-category', category);

		tableCellEl.textContent = cellData['value'].toLocaleString('nl-NL');

		return tableCellEl;
	}
}