class ChartFactory {
	static createChart(data) {
		return ChartFactory.createSvg(data);
	}

	static createSvg(data) {
		return ChartFactory.drawBars(data);
	}

	static drawBars(data) {
		const periods = data['rows'].length;
		const width = ((periods + 1) * 2 - 3);
		const height = DataUtilities.highestRowTotal(data);
		const highestValue = DataUtilities.highestRowTotal(data);
		const highestIndex = data['rows'].length;

		const containerSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		const barsContainerSvg = document.createElementNS('http://www.w3.org/2000/svg','svg');
		const labelsContainerSvg = document.createElementNS('http://www.w3.org/2000/svg','g');

		containerSvg.setAttribute('viewBox', `0 0 500 310`);
		barsContainerSvg.setAttribute('viewBox', `0 0 ${width} ${height}`);
		barsContainerSvg.setAttribute('height', `85%`);
		barsContainerSvg.setAttribute('preserveAspectRatio', `none`);
		// labelsContainerSvg.setAttribute('viewBox', `0 0 ${width} 24`);
		labelsContainerSvg.setAttribute('preserveAspectRatio', `none`);

		data['rows'].forEach((dataset, index) => {
			const unvalidated = DataUtilities.isUnvalidated(dataset);
			barsContainerSvg.appendChild(ChartFactory.drawBar(DataUtilities.TotalRow(dataset), index, highestValue, highestIndex, unvalidated));
			labelsContainerSvg.appendChild(ChartFactory.drawLabel(dataset['title'].value, index, highestIndex, unvalidated));
		});

		containerSvg.appendChild(barsContainerSvg);
		containerSvg.appendChild(labelsContainerSvg);
		return containerSvg;
	}

	static drawBar(value, index, highestValue, highestIndex, unvalidated = false) {
		const el = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
		const x = ((highestIndex - index) * 2 - 2);
		const y = highestValue - Number(value);
		el.setAttribute('x', x);
		el.setAttribute('y', y);
		el.setAttribute('width', 1);
		el.setAttribute('height', Number(value));
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