let API_URL = 'http://localhost:3000/entries/';

const element = document.querySelector('[data-id="1"]');
const id = element.getAttribute('data-id');
console.log("Entry ID is:", id);

function renderEntries(entries) {
    const container = document.getElementById('entry-list');
    container.innerHTML = '';

    entries.forEach(entry => {
        const card = document.createElement('div');
        card.className = "content-container p-3 mb-4";

        card.innerHTML = `
            <p>${new Date(entry.createdAt).toLocaleDateString()}</p>
            <h3 style="color: #007bff">${entry.title}</h3>
            <p>${entry.content}</p>
            <div class="d-flex justify-content-end mt-2">
                <button class="btn btn-outline-primary btn-sm me-2" data-id="${entry.id}" onclick="editEntry(${entry.id})">Edit</button>
                <button class="btn btn-outline-danger btn-sm" data-id="${entry.id}" onclick="deleteEntry(${entry.id})">Delete</button>
            </div>
        `;

        container.appendChild(card);
    });
}

// Search bar
document.getElementById('submitSearch').addEventListener("click", async () => {
    const query = document.getElementById("search").value.trim();

    console.log('submitted');
});

// Create new entry
document.getElementById('create').addEventListener("click", async (e) => {
    console.log('create');
});

// Edit old entry
document.querySelector('.btn-outline-primary').addEventListener("click", async (e) => {});

// Delete old entry
document.querySelector('.btn-outline-danger').addEventListener("click", async (e) => {

});

function createPostElement (data) {}
