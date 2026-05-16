// OPEN BUTTON
const openBtn = document.getElementById('openBtn');

openBtn.addEventListener('click', function() {

    document.querySelector('.flipbook-section').scrollIntoView({
        behavior: 'smooth'
    });

});
// FLIPBOOK
$('#flipbook').turn({
    width: 800,
    height: 500,
    autoCenter: true
});
// LOAD ENTRIES
async function loadEntries() {

    const response = await fetch('/entries');

    const entries = await response.json();

    const notesWall = document.getElementById('notesWall');

    notesWall.innerHTML = '';
     entries.forEach(function(entry) {

        const note = document.createElement('div');

        note.classList.add('note');

        note.style.background = entry.color;

        note.innerText = entry.memory;

        notesWall.appendChild(note);

    });

}
// SUBMIT ENTRY
const submitBtn = document.getElementById('submitBtn');

submitBtn.addEventListener('click', async function() {

    const memory = document.getElementById('memoryInput').value;

    const color = document.getElementById('colorInput').value;

    if(memory.trim() === '') {
        alert('Please write something');
        return;
    }

    await fetch('/entries', {

        method: 'POST',
           headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            memory,
            color
        })

    });

    document.getElementById('memoryInput').value = '';

    loadEntries();

});

loadEntries();