class TableFactory {
	static createTable(tableData) {
		const tableEl = document.createElement('table');
		tableEl.classList.add('line--subtle')
		tableEl.appendChild(this.createTableHeader(tableData));
		tableEl.appendChild(this.createTableFooter(tableData));
		tableEl.appendChild(this.createTableBody(tableData));

		return tableEl;
	}

	static createTableHeader(tableData) {
		const tableHeader = document.createElement('thead');

		for(const cellData in tableData['rows'][0]) {
			const cellEl = document.createElement('th');
			const spanEl = document.createElement('span');
			spanEl.textContent = cellData;
			cellEl.appendChild(spanEl);
			tableHeader.appendChild(cellEl);
		}

		return tableHeader;
	}

	static createTableFooter(tableData) {
		const tableFooter = document.createElement('tfoot');

		for(const cellData in tableData['rows'][0]) {
			let elementType = 'td'
			let cellEl = undefined;

			if(cellData == 'title') {
				elementType = 'th';
				cellEl = document.createElement(elementType);
				cellEl.textContent = 'total';
			} else {
				cellEl = document.createElement(elementType);
			}

			cellEl.setAttribute('data-category', cellData);
			cellEl.setAttribute('data-type', 'total');
			tableFooter.appendChild(cellEl);
		}

		return tableFooter;
	}

	static createTableBody(tableData) {
		const tableBody = document.createElement('tbody');

		tableData['rows'].forEach((rowData, rowNumber) => {
			tableBody.appendChild(this.createTableRow(rowData, rowNumber));
		});

		return tableBody;
	}

	static createTableRow(rowData, rowNumber = null) {
		const tableRowEl = document.createElement('tr');
		tableRowEl.setAttribute('data-title', rowData['title']['value']);
		tableRowEl.setAttribute('data-row', rowNumber);

		for(const cellData in rowData) {
			tableRowEl.appendChild(this.createTableCell(rowData[cellData], cellData));
		}

		return tableRowEl;
	}

	static createTableCell(cellData, category = null) {
		const elementType = (cellData['type'] == 'title') ? 'th' : 'td';
		const tableCellEl = document.createElement(elementType);

		tableCellEl.setAttribute('data-value', cellData['value']);
		tableCellEl.setAttribute('data-type', cellData['type']);
		tableCellEl.setAttribute('data-category', category);

		tableCellEl.textContent = cellData['value'].toLocaleString('nl-NL');

		return tableCellEl;
	}
}

class TableUpdater {
	constructor (element) {
		this.element = element;
	}

	updateBody(data) {
		this.element.querySelector('tbody').remove();
		this.element.appendChild(TableFactory.createTableBody(data));
	}

	updateTotals() {
		let elements = this.element.querySelector('tfoot').querySelectorAll('td');
		elements.forEach((cell) => {
			const total = this.calculateTotal(cell.dataset.category)
			cell.textContent = total['total'].toLocaleString('nl-NL');
			cell.setAttribute('data-type', total['data-type'])
		})
	}

	calculateTotal(category) {
		const elements = this.element.querySelectorAll(`[data-value][data-category="${category}"]`);
		let total = 0;
		let dataType = 'validated';
		elements.forEach((cell) => {
			total += Number(cell.dataset.value);
			if(cell.dataset.type == 'unvalidated') {
				dataType = 'unvalidated';
			}
		});
		return {
			'data-type': dataType,
			'total': total
		};
	}
}