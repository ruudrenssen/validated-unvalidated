class View {
    constructor (element, data) {
        this.element = element;
        this.data = data;
        this.reportingYearSelection = this.element.querySelector('[data-year-selection]');
        this.onlyUnvalidated = this.element.querySelector('[data-unvalidated-only-checkbox]');
        
        this.tableEl = TableFactory.createTable(this.displayData);
        this.tableUpdater = new TableUpdater(this.tableEl);
        const container = element.querySelector('[data-table]');
        container.appendChild(this.tableEl);
        
        this.element.querySelector('[data-navigation]').onchange = this.updateView.bind(this);

        this.populateYearSelection(DataUtilities.rowTitles(this.displayData));
        this.updateView();
    }

    get displayData() {
        if(this.onlyUnvalidated.checked) {
            return this.data['unvalidated'];
        } else {
            return DataUtilities.combineData(this.data['validated'], this.data['unvalidated']);
        }
    }

    updateView(e) {
        this.tableUpdater.updateBody(this.displayData);
        this.tableUpdater.updateTotals();
    }

    populateYearSelection (data) {
        data.forEach(item => {
            let option = document.createElement('option');
            option.value = item;
            option.text = item;
            this.reportingYearSelection.appendChild(option);
        });
    }
}