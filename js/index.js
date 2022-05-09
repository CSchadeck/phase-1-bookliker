//Variables
const bookUrl = 'http://localhost:3000/books';
const patchUrl = 'http://localhost:3000/books/:id';
const bookList = document.querySelector('ul#list');
const showPanel = document.querySelector('div#show-panel');



// functions;
function fetchFunction(url, callback) {
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            callback(data);
        });
};

function renderList(data) {
    data.forEach(function (i) {
        const bookLi = document.createElement("li");
        bookLi.innerText = i.title;
        bookLi.addEventListener('click', function (e) {
            renderBook(i);
        })
        bookList.append(bookLi)
    });

    console.log(data);
}

//thumbnail, description, and a list of users
function renderBook(data) {
    console.log(data.description)
    console.log(data.img_url)
    console.log(data.users)

    //clear book
    showPanel.innerHTML = '';

    //add image
    const image = document.createElement("img")
    image.src = data.img_url;
    image.alt = data.title;
    showPanel.append(image);

    //add description
    const description = document.createElement("p");
    description.innerText = data.description;
    showPanel.append(description);

    //add users
    const userList = document.createElement('ul');
    data.users.forEach(function (user) {
        const userLi = document.createElement('li');
        userLi.innerText = user.username;
        userList.append(userLi);
    })
    showPanel.append(userList);

    //add button
    const button = document.createElement('button');
    button.innerText = 'Like';
    button.addEventListener('click', function(e){
        console.log('click')
        const users = data.users;
        const newUser = {
            id: 333,
            username: 'test user',
        };
        users.push(newUser);
        console.log(users);
        const patchData = {
                'users': users
            };

        fetch(patchUrl, {
            method: 'PATCH',
            body: JSON.stringify(patchData),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
              }
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        });
    })
    showPanel.append(button);

}

//Execution
document.addEventListener("DOMContentLoaded", function () {
    fetchFunction(bookUrl, renderList);
});

