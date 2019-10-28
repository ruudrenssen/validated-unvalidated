class ChartFactory {
    static createChart(data) {
        return this.createSvg(data);
    }

    static createSvg(data) {
        const container = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const el = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        
        const periods = data['rows'].length;
        const width = ((periods + 1) * 2 - 3) * 10;
        const height = 150;

        container.setAttribute('viewBox', `0 0 100 62`);
        
        el.setAttribute('viewBox', `0 0 ${width} ${height}`);
        el.setAttribute('preserveAspectRatio', `none`);

        el.appendChild(this.drawBars(data));

        container.appendChild(el);

        return container;
    }

    static drawBars(data) {
        let group = document.createElementNS('http://www.w3.org/2000/svg','g');
        data['rows'].forEach((dataset, index) => {
            group.appendChild(this.drawBar(DataUtilities.TotalRow(dataset), index));
        });
        return group;
    }

    static drawBar(value, index) {
        const el = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        const x = ((index + 1) * 2 - 2) * 10;
        const y = 150 - Number(value) / 10000;
        el.setAttribute('x', x);
        el.setAttribute('y', y);
        el.setAttribute('width', 10);
        el.setAttribute('height', Number(value) / 10000);
        return el;
    }
}