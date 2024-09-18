const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const submitButton = document.querySelector("#submit-button");
const errorMessage = document.querySelector(".msg");
const usersTable = document.querySelector("#users");

document.addEventListener("DOMContentLoaded", loadUsers);

submitButton.addEventListener("click", (e) => {
    e.preventDefault();

    const nameValue = nameInput.value.trim();
    const emailValue = emailInput.value.trim();

    if (nameValue === "" || emailValue === "") {
        errorMessage.textContent = "Por favor, preencha todos os campos!";
        errorMessage.classList = "error";
        
        setTimeout(() => {
            errorMessage.textContent = "";
            errorMessage.classList = "";
        }, 3000);
        return;
    }

    if (isUserExists(nameValue, emailValue)) {
        errorMessage.textContent = "Usuário já está cadastrado!";
        errorMessage.classList = "error";
        
        setTimeout(() => {
            errorMessage.textContent = "";
            errorMessage.classList = "";
        }, 3000);
        return;
    }

    addUserToList(nameValue, emailValue);
    saveUser(nameValue, emailValue);

    nameInput.value = "";
    emailInput.value = "";
});

function addUserToList(name, email) {
    const row = usersTable.insertRow();
    const nameCell = row.insertCell(0);
    const emailCell = row.insertCell(1);
    const actionCell = row.insertCell(2);
    
    nameCell.textContent = name;
    emailCell.textContent = email;

    const actionDiv = document.createElement('div');
    actionDiv.className = 'action-buttons';

    const newsButton = document.createElement('a');
    newsButton.className = 'btn btn-primary';
    newsButton.textContent = 'Cadastrar Notícia';
    newsButton.href = `index2.html?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`;

    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-danger btn-sm';
    deleteButton.textContent = 'Excluir';
    deleteButton.addEventListener('click', () => {
        row.remove();
        deleteUser(name);
    });

    actionDiv.appendChild(newsButton);
    actionDiv.appendChild(deleteButton);
    actionCell.appendChild(actionDiv);
}

function saveUser(name, email) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push({ name, email });
    localStorage.setItem("users", JSON.stringify(users));
}

function loadUsers() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.forEach(user => {
        addUserToList(user.name, user.email);
    });
}

function deleteUser(name) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users = users.filter(user => user.name !== name);
    localStorage.setItem("users", JSON.stringify(users));
}

function isUserExists(name, email) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    return users.some(user => user.name === name || user.email === email);
}
