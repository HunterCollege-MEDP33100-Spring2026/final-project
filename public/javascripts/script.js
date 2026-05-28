// Your front end javascript goes here

var filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(function(btn) {
  btn.addEventListener('click', function() {
    var category = btn.getAttribute('data-category');
    window.location.href = category === 'all' ? '/' : '/?category=' + category;
  });
});
 
// handle form submission
var form = document.getElementById('entry-form');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
 
    // clear old errors
    document.getElementById('name-error').textContent = '';
    document.getElementById('location-error').textContent = '';
    document.getElementById('category-error').textContent = '';
    document.getElementById('review-error').textContent = '';
    document.getElementById('form-error').textContent = '';
 
    var name = document.getElementById('name').value.trim();
    var location = document.getElementById('location').value.trim();
    var category = document.getElementById('category').value;
    var review = document.getElementById('review').value.trim();
    var submittedBy = document.getElementById('submittedBy').value.trim();
    var lat = document.getElementById('lat').value.trim();
    var lng = document.getElementById('lng').value.trim();
 
    // validate
    var hasError = false;
    if (!name) {
      document.getElementById('name-error').textContent = 'Place name is required';
      hasError = true;
    }
    if (!location) {
      document.getElementById('location-error').textContent = 'Location is required';
      hasError = true;
    }
    if (!category) {
      document.getElementById('category-error').textContent = 'Category is required';
      hasError = true;
    }
    if (!review) {
      document.getElementById('review-error').textContent = 'Review is required';
      hasError = true;
    }
    if (hasError) return;
 
    fetch('/entries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        location: location,
        category: category,
        review: review,
        submittedBy: submittedBy || 'anonymous',
        lat: lat || null,
        lng: lng || null
      })
    })
      .then(function(res) { return res.json(); })
      .then(function(data) {
        if (data.error) {
          document.getElementById('form-error').textContent = data.error;
          return;
        }
 
        // add card to top of list
        var list = document.getElementById('entries-list');
        var empty = list.querySelector('.empty');
        if (empty) empty.remove();
 
        var card = document.createElement('div');
        card.className = 'entry-card';
        card.setAttribute('data-id', data._id);
        card.innerHTML =
          '<div class="entry-top">' +
            '<span class="entry-name">' + data.name + '</span>' +
            '<span class="entry-category cat-' + data.category + '">' + data.category + '</span>' +
          '</div>' +
          '<p class="entry-location">📍 ' + data.location + '</p>' +
          '<p class="entry-review">' + data.review + '</p>' +
          '<div class="entry-meta">' +
            '<span>submitted by ' + data.submittedBy + '</span>' +
            '<button class="delete-btn" data-id="' + data._id + '">delete</button>' +
          '</div>';
 
        list.insertBefore(card, list.firstChild);
 
        // add marker to map if coords provided
        if (data.lat && data.lng) {
          addMarker(data);
        }
 
        form.reset();
      })
      .catch(function() {
        document.getElementById('form-error').textContent = 'Could not connect to server';
      });
  });
}
 
// handle delete
var entriesList = document.getElementById('entries-list');
if (entriesList) {
  entriesList.addEventListener('click', function(e) {
    if (e.target.classList.contains('delete-btn')) {
      var id = e.target.getAttribute('data-id');
      if (!confirm('Delete this entry?')) return;
 
      fetch('/entries/' + id, { method: 'DELETE' })
        .then(function(res) { return res.json(); })
        .then(function(data) {
          if (data.message) {
            var card = document.querySelector('.entry-card[data-id="' + id + '"]');
            if (card) card.remove();
          }
        })
        .catch(function(err) { console.error(err); });
    }
  });
}
 
// leaflet map
var map = L.map('map').setView([40.7128, -74.006], 12);
 
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
 
function addMarker(entry) {
  L.marker([entry.lat, entry.lng])
    .addTo(map)
    .bindPopup(
      '<strong>' + entry.name + '</strong><br>' +
      entry.location + '<br>' +
      '<em>' + entry.category + '</em><br>' +
      entry.review.substring(0, 100) + (entry.review.length > 100 ? '...' : '')
    );
}
 
// add markers for all existing entries
if (typeof entries !== 'undefined') {
  entries.forEach(function(entry) {
    if (entry.lat && entry.lng) {
      addMarker(entry);
    }
  });
}