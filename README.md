# MEDP33100 - Final Project: Public Archive

## Live Demo

- [Include a link to the live version of the project hosted on Render.](https://final-project-pt9v.onrender.com)

## Project Overview

- The Last Message Network is an anonymous public archive where users submit the final message they would leave behind if communication networks were collapsing or the world was ending.

My project explores themes of:

* anonymity
* emotional honesty
* fear
* regret
* hope
* digital communication during crisis

Users can anonymously submit:

* confessions
* warnings
* jokes
* truths
* emotional final transmissions

The website was designed with a cinematic emergency broadcast aesthetic inspired by:

* CRT terminals
* radio transmissions
* collapsing communication systems
* dystopian archives

The goal of the project was to create a more immersive and emotionally engaging archive experience instead of a traditional social media style message board.

## Endpoints

- GET /entries

Returns all saved transmissions from the MongoDB database.

Example use:

* displaying all messages on the archive page


POST /entries

Creates and stores a new transmission in MongoDB.

Used when:

* a user submits the transmission form

GET /entries/:id

Returns a single transmission based on its MongoDB ID.

PUT /entries/:id

Updates an existing transmission by ID.

DELETE /entries/:id

Deletes a transmission from the database.

## Technologies Used

- Languages

* HTML
* CSS
* JavaScript


- Backend

* Node.js
* Express.js


- Database

* MongoDB Atlas
* Mongoose


- Frontend Tools

* Handlebars (.hbs templating)

- Design & Visual Inspiration

* CRT terminal aesthetics
* Emergency broadcast systems
* Cyberpunk/dystopian UI design


- Other Tools

* GitHub
* Render
* Visual Studio Code
* MongoDB Atlas

## Credits

- List any third-party assets used in the project (e.g., sound effects, images, fonts) and provide proper attribution.
- Acknowledge any resources, tutorials, or references you used to help complete the project.

## Future Enhancements

If I were given more time, future improvements I would include are:

* advanced category filtering
* real-time live updates using Socket.io
* audio transmission effects
* typewriter animations
* AI-generated emergency broadcasts
* likes/reactions system
* search functionality
* statistics dashboard for transmission categories
* dark/light terminal modes
* transmission popularity system