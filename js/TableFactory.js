class TableFactory {
	static createTable(tableData) {
		let tableEl = document.createElement('table');
		tableEl.appendChild(this.createTableHeader(tableData));
		tableEl.appendChild(this.createTableFooter(tableData));
		tableEl.appendChild(this.createTableBody(tableData));

		return tableEl;
	}

	static createTableHeader(tableData) {
		let tableHeader = document.createElement('thead');

		for(let cellData in tableData['rows'][0]) {
			let cellEl = document.createElement('th');
			cellEl.textContent = cellData;
			tableHeader.appendChild(cellEl);
		}

		return tableHeader;
	}

	static createTableFooter(tableData) {
		let tableFooter = document.createElement('tfoot');

		for(let cellData in tableData['rows'][0]) {
			let cellEl = document.createElement('td');
			cellEl.setAttribute('category', cellData);
			cellEl.setAttribute('type', 'total');
			tableFooter.appendChild(cellEl);
		}

		return tableFooter;
	}

	static createTableBody(tableData) {
		let tableBody = document.createElement('tbody');

		tableData['rows'].forEach((rowData, rowNumber) => {
			tableBody.appendChild(this.createTableRow(rowData, rowNumber));
		});

		return tableBody;
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