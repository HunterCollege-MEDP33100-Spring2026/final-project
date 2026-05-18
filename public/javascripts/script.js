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

// const notes = document.querySelectorAll('.note-card');

// for (let i = 0; i < notes.length; i++) {

//   const note = notes[i];

//   note.style.left = `${Math.random() * 800}px`;
//   note.style.top = `${Math.random() * 500}px`;

//   makeDraggable(note);
// }

// function makeDraggable(element) {

//   let offsetX = 0;
//   let offsetY = 0;
//   let isDragging = false;

//   element.style.position = 'absolute';
//   element.style.cursor = 'move';

//   element.addEventListener('mousedown', startDragging);

//   function startDragging(event) {

//     isDragging = true;

//     offsetX = event.clientX - element.offsetLeft;
//     offsetY = event.clientY - element.offsetTop;

//     element.style.zIndex = 1000;

//     document.addEventListener('mousemove', drag);
//     document.addEventListener('mouseup', stopDragging);
//   }

//   function drag(event) {

//     if (!isDragging) return;

//     element.style.left = `${event.clientX - offsetX}px`;
//     element.style.top = `${event.clientY - offsetY}px`;
//   }

//   function stopDragging() {

//     isDragging = false;

//     document.removeEventListener('mousemove', drag);
//     document.removeEventListener('mouseup', stopDragging);
//   }
// }