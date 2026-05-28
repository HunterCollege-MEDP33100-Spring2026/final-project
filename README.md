# MEDP33100 - Final Project: Public Archive

## Live Demo

- [Insert Render link here]

## Project Overview

- I Love NYC is a public archive where anyone can submit and browse their favorite spots around New York City. Users fill out a form with a place name, location, category, and review. Entries appear in a live feed that can be filtered by category, and spots with coordinates show up as markers on an interactive map.

## Endpoints

- GET /entries — returns all entries, supports optional ?category= query to filter by category
- GET /entries/:id — returns a single entry that matches the given id
- POST /entries — creates and saves a new entry
- PUT /entries/:id — updates the entry that matches the given id
- DELETE /entries/:id — deletes the entry that matches the given id

## Technologies Used

- List the technologies and tools used in the project:
  - **Languages**: HTML, CSS, JavaScript
  - **Libraries**: Leaflet.js for the interactive map, Handlebars (hbs) for templating, Mongoose for working with MongoDB
  - **Other**: MongoDB Atlas for the database, Express for the server, dotenv for environment variables

## Credits

- Map tiles provided by [OpenStreetMap](https://www.openstreetmap.org/copyright)
- Interactive map built with [Leaflet.js](https://leafletjs.com)

## Future Enhancements

- Add the ability to upload a photo with each submission
- Let users upvote their favorite spots
- Use a geocoding API to auto-fill lat/lng from an address
