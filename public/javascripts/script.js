const form = document.getElementById("entryForm");
const container = document.getElementById("entriesContainer");


// Load entries from MongoDB
async function loadEntries() {

    // Prevent errors if container does not exist
    if (!container) return;

    try {

        const response = await fetch("/entries");

        const entries = await response.json();

        container.innerHTML = "";

        entries.forEach(function(entry) {

            const div = document.createElement("div");

            div.classList.add("entry-card");

            div.innerHTML = `
                <h3>${entry.category || "UNKNOWN SIGNAL"}</h3>
                <p>${entry.message}</p>
                <small>${entry.alias || "Anonymous"}</small>
            `;

            container.appendChild(div);
        });

    } catch(error) {

        console.log("Error loading entries:", error);
    }
}


// Load messages immediately
loadEntries();


// Submit form
if (form) {

    form.addEventListener("submit", async function(event) {

        event.preventDefault();

        const formData = new FormData(form);

        const data = Object.fromEntries(formData);

        // Convert checkbox into boolean
        data.sendStatus = formData.get("sendStatus") === "true";

        try {

            await fetch("/entries", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            form.reset();

            loadEntries();

        } catch(error) {

            console.log("Error submitting entry:", error);
        }
    });
}