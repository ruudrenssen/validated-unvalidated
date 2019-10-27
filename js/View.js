class View {
    constructor (element, data) {
        this.element = element;
        this.data = data;
        this.tableEl = TableFactory.createTable(data);
        this.tableUpdater = new TableUpdater(this.tableEl);
        
        const container = element.querySelector('[data-table]');
        container.appendChild(this.tableEl);
        
        this.element.querySelector('[data-navigation]').onchange = this.updateView.bind(this);

        this.updateView();
    }

    updateView(e) {
        const reportingYearSelection = this.element.querySelector('[data-year-selection]');
        const onlyUnvalidated = this.element.querySelector('[data-unvalidated-only-checkbox]');

        console.log(onlyUnvalidated.checked)
        console.log(reportingYearSelection.value)
        
        this.tableUpdater.updateBody(this.data);
        this.tableUpdater.updateTotals();
    }

    populateYearSelection (data) {
        
    }
}