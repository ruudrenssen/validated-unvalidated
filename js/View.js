class View {
    constructor (element, data) {
        this.element = element;
        this.data = data;

        this.reportingYearSelection = this.element.querySelector('[data-year-selection]');
        this.onlyUnvalidated = this.element.querySelector('[data-unvalidated-only-checkbox]');
        this.disclaimer = this.element.querySelector('[data-combined-disclaimer]');
        this.disclaimerCloseBtn = this.element.querySelector('[data-disclaimer-close]');
        this.disclaimerYear = this.element.querySelector('[data-disclaimer-year]');
        this.legend = this.element.querySelector('[data-unvalidated-legend]');
        this.contentNav = this.element.querySelector('[data-content-navigation]');
        this.contentElements = this.element.querySelectorAll('.layout__main');
        this.reportChange = true;
        this.disclaimerVisisble = true;

        const tableContainer = element.querySelector('[data-table-container]');
        const chartContainer = element.querySelector('[data-chart-container]');
        this.tableEl = TableFactory.createTable(this.displayData);
        this.chartEl = ChartFactory.createChart(this.displayData);
        this.tableUpdater = new TableUpdater(this.tableEl);
        this.chartUpdater = new ChartUpdater(this.chartEl);
        tableContainer.appendChild(this.tableEl);
        chartContainer.appendChild(this.chartEl);

        this.populateYearSelection(DataUtilities.rowTitles(this.displayData));
        this.updateView();

        this.element.querySelector('[data-navigation]').onchange = this.setDate.bind(this);
        this.contentNav.addEventListener('click', this.navigate.bind(this));
        this.disclaimerCloseBtn.addEventListener('click', this.hideDisclaimer.bind(this))
    }

    set showDisclaimer(value) {
        this.disclaimerVisisble = value;
    }

    get showDisclaimer() {
        console.log(this.disclaimerVisisble);
        console.log(this.reportChange);
        console.log(this.containsCombinedData);
        if(this.disclaimerVisisble || (this.reportChange && this.containsCombinedData)) {
            return true;
        } else {
            return false;
        }
    }

    get displayData() {
        const rowCount = this.data['unvalidated']['rows'].length;
        const startRow = Number(this.reportingYearSelection.value);
        let data = {};
        if(this.onlyUnvalidated.checked) {
            data = Object.assign({}, this.data['unvalidated']);
        } else {
            data = Object.assign({}, DataUtilities.combineData(this.data['validated'], this.data['unvalidated']));
        }
        data = DataUtilities.subset(data, rowCount, startRow);
        return data;
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

    set activeView (value) {
        this.contentNav.querySelectorAll(`[value]`).forEach((el) => {
            el.classList.remove('is-active')
        })
        let el = this.contentNav.querySelector(`[value=${value}]`);
        el.classList.add('is-active');
        this.updateView();
    }

    get activeView () {
        return this.contentNav.querySelector('.is-active').value;
    }

    setDate(e) {
        this.reportChange = true;
        this.updateView(e);
    }

    navigate(e) {
        this.activeView = e.target.value;
    }

    hideDisclaimer(e) {
        this.showDisclaimer = false;
        this.disclaimer.hidden = true;
    }

    updateView(e) {
        const data = this.displayData
        this.tableUpdater.updateBody(data);
        this.tableUpdater.updateTotals();
        this.chartUpdater.updateChart(data);
        this.disclaimerYear.textContent = `(${this.reportingYearSelection.options[this.reportingYearSelection.value].text})`;
        this.showDisclaimer ? this.disclaimer.hidden = false : this.disclaimer.hidden = true;
        this.containsUnvalidatedData ? this.legend.hidden = false : this.legend.hidden = true;
        this.showView(this.activeView);
        this.reportChange = false;
    }

    showView(name) {
        this.contentElements.forEach(el => {
            if(el.getAttribute('data-content') == name) {
                el.hidden = false;
            } else {
                el.hidden = true;
            }
        });
    }

    populateYearSelection (data) {
        data.forEach((item, index) => {
            let option = document.createElement('option');
            option.value = index;
            option.text = item;
            this.reportingYearSelection.appendChild(option);
        });
    }
}