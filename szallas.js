fetch('https://nodejs.sulla.hu/data')
  .then(response => response.json())
  .then(data => {
    data.forEach(cardData => {
      const card = createCard(cardData);
      document.getElementById('cardContainer').appendChild(card);
    });
  })
  .catch(error => console.error('Hiba történt:', error));

  function createCard(cardData) {
    console.log(cardData); // Így megjeleníted a cardData objektumot a konzolon, hogy láthasd, mit tartalmaz
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <h2>${cardData.title}</h2>
      <p>${cardData.description}</p>
      <button onclick="viewCard('${cardData.id}')">Megtekintés</button>
      <button onclick="editCard('${cardData.id}')">Módosítás</button>
      <button onclick="confirmDelete('${cardData.id}')">Törlés</button>
    `;
    return card;
  }
  

function viewCard(cardId) {
  alert(`Kártya megtekintése - Azonosító: ${cardId}`);
}

function editCard(cardId) {
  alert(`Kártya módosítása - Azonosító: ${cardId}`);
}

function confirmDelete(cardId) {
  if (confirm("Biztosan törölni szeretnéd ezt a kártyát?")) {
    // Itt lehetőséged van a kártya törlését szerveroldalon végrehajtani
    alert("A kártya sikeresen törölve lett!");
  } else {
    alert("A törlés megerősítése elutasítva.");
  }
}

document.getElementById('newAccommodationForm').addEventListener('submit', function(event) {
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
  
    if (name.length < 2) {
      alert('A név legalább 2 karakter hosszúnak kell lennie!');
      event.preventDefault();
    }
  
    if (address.length < 5) {
      alert('A cím legalább 5 karakter hosszúnak kell lennie!');
      event.preventDefault();
    }
  });
  