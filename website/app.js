//const { response } = require("express");

let API_URL = 'http://localhost:3000/entries/';

const search = document.getElementById('search');

// Search bar
document.getElementById('submitSearch').addEventListener("click", async (e) => {
    console.log('submitted');

    //let URL = 'http://localhost:3000/entries/title/';

    const data = {name: e.target.search.value};
    console.log(data);

    const resp = await getAll(API_URL);
});

// Create new entry
document.getElementById('create').addEventListener("click", async (e) => {
    console.log('create');
    const resp = await sendPostRequest({title: "Entry 2", content: "...", category: "Other", createdAt: "2025-07-20", lastEditedAt: "2025-07-20"});
});

// Edit old entry
document.querySelector('.btn-outline-primary').addEventListener("click", async (e) => {});

// Delete old entry
document.querySelector('.btn-outline-danger').addEventListener("click", async (e) => {});

function createEntry (data) {}

async function sendPostRequest (data) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }

    const resp = await fetch(API_URL, options);

    console.log(resp);

    return resp;
}

async function getAll (URL) {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }

    const resp = await fetch(URL);
    const data = await resp.json();

    console.log(data);

    return resp;
}

async function getAllByTitle (URL, title) {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }

    URL = URL + title;

    const resp = await fetch(URL, options);

    console.log(resp);

    return resp;
}

async function deleteEntry (id) {
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }

    const URL = API_URL + id;

    const resp = await fetch(URL, options);


    console.log(resp);

    return resp;
}