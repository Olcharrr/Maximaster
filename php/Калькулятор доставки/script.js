const citySelect = document.querySelector('.citySelect');
const weightInput = document.querySelector('.weightInput');
const submitBtn = document.querySelector('.submitBtn');
const resultContainer = document.querySelector('.result');

async function calcPrice(event) {
    event.preventDefault();

    const response = await fetch(`http://exercise.develop.maximaster.ru/service/delivery/?city=${citySelect.value}&weight=${weightInput.value}`);
    const data = await response.json();

    resultContainer.className = data.status;
    resultContainer.innerHTML = data.message;
}

submitBtn.addEventListener('click', calcPrice);