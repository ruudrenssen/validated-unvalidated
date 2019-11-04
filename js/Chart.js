class ChartFactory {
	static createChart(data) {
		return ChartFactory.createSvg(data);
	}

	static createSvg(data) {
		return ChartFactory.drawBars(data);
	}

	static drawBars(data) {
		const multiplier = 100000; // in order to draw SVG neat in Edge
		const periods = data['rows'].length;
		const width = ((periods + 1) * 2 - 3);
		const height = DataUtilities.highestRowTotal(data) / multiplier;
		const highestValue = DataUtilities.highestRowTotal(data) / multiplier;
		const highestIndex = data['rows'].length;

		const containerSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		const barsContainerSvg = document.createElementNS('http://www.w3.org/2000/svg','svg');
		const labelsContainerSvg = document.createElementNS('http://www.w3.org/2000/svg','g');

		containerSvg.setAttribute('viewBox', `0 0 500 310`);
		barsContainerSvg.setAttribute('viewBox', `0 0 ${width} ${height}`);
		barsContainerSvg.setAttribute('height', `85%`);
		barsContainerSvg.setAttribute('preserveAspectRatio', `none`);
		labelsContainerSvg.setAttribute('viewBox', `0 0 ${width} 24`);
		labelsContainerSvg.setAttribute('preserveAspectRatio', `xMidYMid meet`);

		data['rows'].forEach((dataset, index) => {
			const unvalidated = DataUtilities.isUnvalidated(dataset);
			barsContainerSvg.appendChild(ChartFactory.drawBar(DataUtilities.TotalRow(dataset), index, highestValue, highestIndex, unvalidated, multiplier));
			labelsContainerSvg.appendChild(ChartFactory.drawLabel(dataset['title'].value, index, highestIndex, unvalidated));
		});

		containerSvg.appendChild(barsContainerSvg);
		containerSvg.appendChild(labelsContainerSvg);
		return containerSvg;
	}

	static drawBar(value, index, highestValue, highestIndex, unvalidated = false, multiplier = 1) {
		const el = document.createElementNS('http://www.w3.org/2000/svg', 'line');
		const x = ((highestIndex - index) * 2 - 2);
		const y = highestValue - Number(value / multiplier);
		el.setAttribute('x1', (x + .5));
		el.setAttribute('x2', (x + .5));
		el.setAttribute('y1', y);
		el.setAttribute('y2', highestValue);
		el.setAttribute('stroke-width', 1);
		el.setAttribute('height', Number(value / multiplier));
		if(unvalidated) {
			el.classList.add('unvalidated');
		}
		return el;
	}

	static drawLabel(title, index, highestIndex, unvalidated = false) {
		const el = document.createElementNS('http://www.w3.org/2000/svg', 'text');
		const x = (((highestIndex - index - .75) * 2) / (highestIndex * 2 - 1)) * 100;
		el.textContent = title;
		el.setAttribute('text-anchor', 'middle');
		el.setAttribute('x', `${x}%`);
		el.setAttribute('y', '90%');
		if(unvalidated) {
			el.classList.add('unvalidated');
		}
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