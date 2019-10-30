class ChartFactory {
	static createChart(data) {
		return ChartFactory.createSvg(data);
	}

	static createSvg(data) {
		const container = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		const el = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		const periods = data['rows'].length;
		const width = ((periods + 1) * 2 - 3);
		const height = DataUtilities.highestRowTotal(data);

		container.setAttribute('viewBox', `0 0 100 62`);

		el.setAttribute('viewBox', `0 0 ${width} ${height}`);
		el.setAttribute('preserveAspectRatio', `none`);

		el.appendChild(ChartFactory.drawBars(data));

		container.appendChild(el);

		return container;
	}

	static drawBars(data) {
		let highestValue = DataUtilities.highestRowTotal(data);
		let highestIndex = data['rows'].length;
		let group = document.createElementNS('http://www.w3.org/2000/svg','g');
		data['rows'].forEach((dataset, index) => {
			group.appendChild(ChartFactory.drawBar(DataUtilities.TotalRow(dataset), index, highestValue, highestIndex));
		});
		return group;
	}

	static drawBar(value, index, highestValue, highestIndex) {
		const el = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
		const x = ((highestIndex - index) * 2 - 2);
		const y = highestValue - Number(value);
		el.setAttribute('x', x);
		el.setAttribute('y', y);
		el.setAttribute('width', 1);
		el.setAttribute('height', Number(value));
		return el;
	}
}

class ChartUpdater {
	constructor(element) {
		this.element = element;
	}

	updateChart(data) {
		let parent = this.element.parentNode;
		this.element.parentNode.removeChild(this.element);
		this.element = ChartFactory.createChart(data);
		parent.appendChild(this.element);
	}
}