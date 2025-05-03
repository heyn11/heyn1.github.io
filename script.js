let spinning = false;
let balance = parseInt(localStorage.getItem('balance')) || 300;

const balanceAmount = document.getElementById('balance-amount');
const resultText = document.getElementById('result');
balanceAmount.innerText = balance;

const prizes = [
  { value: 5, class: "common", chance: 70 },
  { value: 50, class: "rare", chance: 25 },
  { value: 100, class: "very-rare", chance: 4.5 },
  { value: 500, class: "ultra-rare", chance: 0.5 }
];

function saveBalance() {
  localStorage.setItem('balance', balance);
}

function openRoulette() {
  document.querySelector('.menu').style.display = 'none';
  document.getElementById('roulette').style.display = 'block';
}

function goBack() {
  document.querySelector('.menu').style.display = 'block';
  document.getElementById('roulette').style.display = 'none';
}

function getRandomPrize() {
  const rand = Math.random() * 100;
  let total = 0;
  for (let i = 0; i < prizes.length; i++) {
    total += prizes[i].chance;
    if (rand < total) return prizes[i];
  }
  return prizes[0];
}

function startRoulette() {
  if (spinning || balance < 50) return alert("Недостаточно звёздочек!");

  spinning = true;
  balance -= 50;
  balanceAmount.innerText = balance;
  saveBalance();
  resultText.innerText = 'Крутим...';

  const container = document.getElementById('roulette-items');
  container.innerHTML = '';

  const itemWidth = 100;
  const totalItems = 100;
  const items = [];

  for (let i = 0; i < totalItems; i++) {
    const prize = getRandomPrize();
    const item = document.createElement('div');
    item.className = `item ${prize.class}`;
    item.textContent = `${prize.value}★`;
    container.appendChild(item);
    items.push({ element: item, prize });
  }

  const visibleItems = 3;
  const centerIndex = Math.floor(visibleItems / 2);
  const stopIndex = Math.floor(totalItems / 2 + Math.random() * 10 - 5);
  const scrollTo = stopIndex * itemWidth - centerIndex * itemWidth;

  container.style.transition = 'none';
  container.style.transform = `translateX(0px)`;

  setTimeout(() => {
    container.style.transition = 'transform 3.5s cubic-bezier(0.2, 0.6, 0.3, 1)';
    container.style.transform = `translateX(-${scrollTo}px)`;
  }, 50);

  setTimeout(() => {
    const selected = items[stopIndex];
    selected.element.classList.add('flash');
    resultText.innerText = `Вы выиграли: ${selected.prize.value}★!`;
    balance += selected.prize.value;
    balanceAmount.innerText = balance;
    saveBalance();
    spinning = false;
  }, 3700);
}
