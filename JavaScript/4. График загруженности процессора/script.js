let requests = 1;
let badRequests = 0;

const errors = document.querySelector('.errors');
const ctx = document.getElementById('cpuChart').getContext('2d');
const chart = new Chart(ctx, {
	type: 'line',
	data: {
		labels: [],
		datasets: [
			{
				label: 'Загруженность процессора',
				data: [],
				backgroundColor: 'rgba(99, 255, 132, 0.2)',
				borderColor: 'rgba(99, 255, 132, 1)',
				borderWidth: 1,
			},
		],
	},
	options: {
		scales: {
			y: {
				beginAtZero: true,
			},
		},
	},
});

async function getCPUUtilization() {
	const response = await fetch('http://exercise.develop.maximaster.ru/service/cpu/');
	requests++;

	if (response.ok) {
		const utilization = await response.text();

		chart.data.labels.push(requests);
		chart.data.datasets[0].data.push(Number(utilization));
		chart.update();
	} else badRequests++;

	errors.innerHTML = `Всего запросов: ${requests}. Процент запросов, вернувших ошибку: ${(badRequests / requests) * 100}%`;
}

setInterval(getCPUUtilization, 5000);
