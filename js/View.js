class View {
    constructor (element, data) {
        this.element = element;
        this.data = data;
        this.reportingYearSelection = this.element.querySelector('[data-year-selection]');
        this.onlyUnvalidated = this.element.querySelector('[data-unvalidated-only-checkbox]');
        this.disclaimer = this.element.querySelector('[data-combined-disclaimer]');
        this.legend = this.element.querySelector('[data-unvalidated-legend]');

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

    get containsCombinedData () {
        if(document.querySelector('[data-type="unvalidated"]') && document.querySelector('[data-type="validated"]')) {
            return true;
        } else {
            return false;
        }
    }

    get containsUnvalidatedData() {
        if(document.querySelector('[data-type="unvalidated"]')) {
            return true;
        } else {
            return false;
        }
    }

    updateView(e) {
        this.tableUpdater.updateBody(this.displayData);
        this.tableUpdater.updateTotals();
        this.containsCombinedData ? this.disclaimer.hidden = false : this.disclaimer.hidden = true;
        this.containsUnvalidatedData ? this.legend.hidden = false : this.legend.hidden = true;
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