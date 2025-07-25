let API_URL = 'http://localhost:3000/entries/';

let lastSearch = '';
document.getElementById('submitSearch').click();

// const element = document.querySelector('[data-id="1"]');
// const id = element.getAttribute('data-id');
// console.log("Entry ID is:", id);

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
};

// Search bar
document.getElementById('submitSearch').addEventListener("click", async (e) => {
    const query = document.getElementById("search").value.trim();
    lastSearch = query;

    console.log('submitted');
    let data = '';

    if (query.length === 0) {
        data = await getAll(API_URL);
    } else {
        let URL = 'http://localhost:3000/entries/title/';
        data = await getAllByTitle(URL, query);
    }

    console.log(data);

    renderEntries(data);
});

// Create new entry
document.getElementById('create').addEventListener("click", async (e) => {
    console.log('create');
    const data = await sendPostRequest({title: "Entry 3", content: "...", category: "Other", createdAt: "2025-07-20", lastEditedAt: "2025-07-20"});
    console.log(data);
});

async function sendPostRequest (data) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }

    const resp = await fetch(API_URL, options);
    const respBody = await resp.json();

    return respBody;
};

async function getAll (URL) {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }

    const resp = await fetch(URL);
    const respBody = await resp.json();

    return respBody;
};

async function getAllByTitle (URL, title) {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }

    URL = URL + title;

    const resp = await fetch(URL, options);
    const respBody = await resp.json();

    return respBody;
};

async function editEntry(id) {
    const data = {content: "insert text here!!!"};

    const options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }

    const URL = API_URL + id;

    const resp = await fetch(URL, options);
    const respBody = await resp.json();

    console.log(respBody);

    document.getElementById("search").value = lastSearch;
    document.getElementById('submitSearch').click();

    return respBody;
}

async function deleteEntry(id) {
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }

    const URL = API_URL + id;

    const resp = await fetch(URL, options);
    const respBody = await resp.json();

    console.log(respBody);

    document.getElementById("search").value = lastSearch;
    document.getElementById('submitSearch').click();

    return respBody;
};