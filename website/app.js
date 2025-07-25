let API_URL = 'http://localhost:3000/entries/';

let mode = '';
document.getElementById('title-outlined').click();

let lastSearch = '';
document.getElementById('submitSearch').click();

function changeMode(input) {mode = input;};

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

function renderCategories(categories) {
    const container = document.getElementById('entry-list');
    container.innerHTML = '';

    categories.forEach(category => {
        const card = document.createElement('div');
        card.className = "content-container p-3 mb-4";

        card.innerHTML = `
            <p>${category.category}</p>
        `;

        container.appendChild(card);
    });
}

// Search bar
document.getElementById('submitSearch').addEventListener("click", async (e) => {
    const query = document.getElementById("search").value.trim();
    lastSearch = query;

    console.log('submitted');
    let data = '';

    if (query.length === 0) {
        if (mode === 'categories/') {
            let URL = 'http://localhost:3000/entries/categories/';
            data = await getAll(URL);
            renderCategories(data);
        } else {
            data = await getAll(API_URL);
            renderEntries(data);
        }
    } else {
        data = await getAllByTitle(API_URL, query);
        renderEntries(data);
    }

});

// Create new entry
document.getElementById('create').addEventListener("click", async (e) => {
    console.log('create');
    const data = await sendPostRequest({title: "Entry 3", content: "...", category: "Other", createdAt: "2025-07-20", lastEditedAt: "2025-07-20"});
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

    const resp = await fetch(URL, options);
    const respBody = await resp.json();

    return respBody;
};

async function getAllByTitle (URL, query) {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }

    URL = URL + mode + query;

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

    document.getElementById("search").value = lastSearch;
    document.getElementById('submitSearch').click();

    return respBody;
};