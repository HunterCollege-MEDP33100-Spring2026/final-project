const createForm = document.querySelector('#create-form');

if (createForm) {

  createForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = {
      title: formData.get('title'),
      content: formData.get('content')
    };

    try {
      const response = await fetch('/entries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      console.log(result);

      if (response.ok) {
        location.reload();
      }
    }

    catch (error) {
      console.log(error);
    }
  });
}

const deleteButtons = document.querySelectorAll('.delete-btn');

deleteButtons.forEach(function (button) {
  button.addEventListener('click', async function () {
    const noteCard = this.closest('.note-card');

    const noteId = noteCard.dataset.id;
    try {
      const response = await fetch(`/entries/${noteId}`, {
        method: 'DELETE'
      });
      const result = await response.json();
      console.log(result);

      if (response.ok) {
        noteCard.remove();
      }
    }
    catch (error) {
      console.log(error);
    }
  });
});

const editForms = document.querySelectorAll('.edit-form');

editForms.forEach(function (form) {
  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const noteCard = this.closest('.note-card');

    const noteId = noteCard.dataset.id;
    const formData = new FormData(this);

    const updatedData = {
      title: formData.get('title'),
      content: formData.get('content')
    };

    try {
      const response = await fetch(`/entries/${noteId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
      });

      const result = await response.json();

      console.log(result);

      if (response.ok) {
        noteCard.querySelector('.note-title').textContent = result.title;
        noteCard.querySelector('.note-content').textContent = result.content;
      }
    }

    catch (error) {
      console.log(error);
    }
  });
});

document.querySelectorAll('.note-card').forEach(note => {
  const hue = Math.floor(Math.random() * 360);
  note.style.setProperty('--note-color', `hsl(${hue}, 70%, 80%)`);
});