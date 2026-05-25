// LOAD MEMORIES

async function loadEntries() {

    try {

        const response =
        await fetch('/entries');

        const entries =
        await response.json();

        const notesWall =
        document.getElementById('notesWall');

        notesWall.innerHTML = '';


        entries.forEach(function(entry) {

            const note =
            document.createElement('div');

            note.classList.add('note');

            // set sticky note color
            note.style.backgroundColor =
            entry.color || '#ffeb3b';

            // set note text
            note.textContent =
            entry.memory || 'No memory';

            notesWall.appendChild(note);

        });

    } catch (error) {

        console.log(
            'Error loading memories:',
            error
        );

    }

}

// ADD MEMORY

const submitBtn =
document.getElementById('submitBtn');


submitBtn.addEventListener('click',
async function () {

    const memory =
    document.getElementById(
        'memoryInput'
    ).value;

    const color =
    document.getElementById(
        'colorInput'
    ).value;


    if (memory.trim() === '') {

        alert(
            'Write a memory first.'
        );

        return;
    }


    try {

        const response =
        await fetch('/entries', {

            method: 'POST',

            headers: {
                'Content-Type':
                'application/json'
            },

            body: JSON.stringify({

                memory: memory,
                color: color

            })

        });

        const data =
        await response.json();

        console.log(data);


        // clear textbox
        document.getElementById(
            'memoryInput'
        ).value = '';


        // reload wall
        loadEntries();

    } catch (error) {

        console.log(
            'Error saving memory:',
            error
        );

    }

});


// LOAD ON PAGE OPEN

loadEntries();