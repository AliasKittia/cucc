// script.js

document.addEventListener('DOMContentLoaded', function() {
    loadHotels(); // Szállások betöltése az oldal betöltésekor

    document.getElementById('addHotelForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Űrlap elküldésének megakadályozása

        var formData = new FormData(this); // Űrlapadatok lekérése
        addHotel(formData); // Új szállás felvitele
    });

    document.getElementById('listing').addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-btn')) {
            var hotelId = event.target.getAttribute('data-id');
            var confirmation = confirm('Biztosan törlöd?');
            if (confirmation) {
                deleteHotel(hotelId); // Szállás törlése
            }
        }
    });
});

function loadHotels() {
    fetch('https://nodejs.sulla.hu/data')
        .then(response => response.json())
        .then(data => {
            displayHotels(data); // Szállások megjelenítése
        })
        .catch(error => console.error('Hiba történt:', error));
}

function displayHotels(hotels) {
    var listingDiv = document.getElementById('listing');
    listingDiv.innerHTML = ''; // Meglévő kártyák törlése

    hotels.forEach(function(hotel, index) {
        var cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        cardDiv.innerHTML = `
            <h3>${hotel.name}</h3>
            <p>Ár: ${hotel.price}</p>
            <button class="delete-btn" data-id="${index}">Törlés</button>
        `;
        listingDiv.appendChild(cardDiv);
    });
}

function addHotel(formData) {
    fetch('add_hotel.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            loadHotels(); // Újra betöltjük a szállásokat
            document.getElementById('addHotelForm').reset(); // Űrlap ürítése
        } else {
            console.error('Hiba történt:', data.error);
        }
    })
    .catch(error => console.error('Hiba történt:', error));
}

function deleteHotel(hotelId) {
    fetch('delete_hotel.php?id=' + hotelId, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            loadHotels(); // Újra betöltjük a szállásokat
        } else {
            console.error('Hiba történt:', data.error);
        }
    })
    .catch(error => console.error('Hiba történt:', error));
}
