const entryForm = document.getElementById("entryForm");
const entriesContainer = document.getElementById("entriesContainer");
const formMessage = document.getElementById("formMessage");
const filterMood = document.getElementById("filterMood");
const sortEntries = document.getElementById("sortEntries");
const searchTag = document.getElementById("searchTag");

let allEntries = [];

async function loadEntries() {
    try {
        const response = await fetch('/entries');
        const data = await response.json();
        allEntries = data;
        renderEntries(allEntries);
    } catch (error) {
        console.log('Error loading entries:', error);
        entriesContainer.innerHTML = `<p class="empty-message">Could not load the archive right now.</p>`;
    }
}

function renderEntries(entries) {
    entriesContainer.innerHTML = '';

    if (entries.length === 0) {
        entriesContainer.innerHTML = `<p class="empty-message">No bottles found yet.</p>`;
        return;
    }

    entries.forEach((entry) => {
        const card = document.createElement('div');
        card.classList.add('entry-card');

        card.innerHTML = `
            <span class="entry-mood">${entry.mood || 'unknown'}</span>
            <p class="entry-message">${entry.message}</p>
            <div class="entry-meta">
                <div><strong>To:</strong> ${entry.toWhom || 'to a stranger'}</div>
                <div><strong>Added:</strong> ${new Date(entry.createdAt).toLocaleString()}</div>
            </div>
            ${entry.tag ? `<span class="entry-tag">#${entry.tag}</span>` : ''}
        `;

        entriesContainer.appendChild(card);
    });
}

function applyFilters() {
    let filtered = [...allEntries];

    const moodValue = filterMood.value;
    const sortValue = sortEntries.value;
    const tagValue = searchTag.value.toLowerCase().trim();

    if (moodValue !== 'all') {
        filtered = filtered.filter((entry) => entry.mood === moodValue);
    }

    if (tagValue !== '') {
        filtered = filtered.filter((entry) =>
            entry.tag && entry.tag.toLowerCase().includes(tagValue)
        );
    }

    if (sortValue === 'newest') {
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortValue === 'oldest') {
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    renderEntries(filtered);
}

entryForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const message = document.getElementById("message").value;
    const mood = document.getElementById("mood").value;
    const toWhom = document.getElementById("toWhom").value;
    const tag = document.getElementById("tag").value;

    try {
        const response = await fetch('/entries', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message, mood, toWhom, tag })
        });

        const result = await response.json();

        if (!response.ok) {
            formMessage.textContent = result.error || 'Something went wrong.';
            formMessage.style.color = '#fca5a5';
            return;
        }

        formMessage.textContent = 'Your bottle was added to the archive.';
        formMessage.style.color = '#9ae6b4';
        entryForm.reset();

        await loadEntries();
    } catch (error) {
        console.log('Error submitting entry:', error);
        formMessage.textContent = 'Could not send your bottle right now.';
        formMessage.style.color = '#fca5a5';
    }
});

filterMood.addEventListener('change', applyFilters);
sortEntries.addEventListener('change', applyFilters);
searchTag.addEventListener('input', applyFilters);

loadEntries();