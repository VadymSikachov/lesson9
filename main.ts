const GetS = sel => document.querySelector(sel);
var User = [];
let userIndex: any;
let regLogin = /^[a-z]{4,16}$/i;
let regPassword = /\S{4,16}/gi;
let regEmail = /^.{1,}@[a-z]{1,}\.[a-z]{1,}$/i;
function validate() {
    if (regLogin.test(GetS('.login').value)
        && regPassword.test(GetS('.password').value)
        && regEmail.test(GetS('.email').value)) {
        return true;
    }

    else {
        return false;
    }
}
GetS('.add-user').addEventListener('click', function () {
    addUser();
})
function addUser() {
    if (validate()) {
        // a. Стягуєте дані з полів і формує об’єкт.
        let obj: {} = {
            login: GetS('.login').value,
            password: GetS('.password').value,
            email: GetS('.email').value,
            edit: 'edit',
            delete: 'delete'
        };

        // b. Цей об’єкт пушитю в масив.
        User.push(Object.entries(obj));
        // c. Поля зачищає.
        GetS('.form-user').reset();
        // d. Запускаєм функцію render() яка генерую всю інфу в таблицю відносно вашого масиву.
        render();
    }

}
function render() {
    let elemParrent = GetS('.table-user');
    elemParrent.replaceChildren();
    let Head = document.createElement('tr');
    Head.classList.add('head-user');
    Head.innerHTML = `<td>#</td><td>Login</td><td>Password</td><td>Email</td><td>Edit</td><td>Delete</td>`
    GetS('.table-user').appendChild(Head);
    User.forEach(function (value, index) {
        let tr = document.createElement('tr')
        let td = document.createElement('td')
        td.textContent = (index + 1).toString();
        tr.appendChild(td)
        value.forEach(function (value1) {
            let tdForm = document.createElement('td')
            if (value1[1] == 'edit') {
                tdForm.innerHTML = `<input type='button' value='edit' id='edit${index + 1}' class='edit'>`;
            }
            else if (value1[1] == 'delete') {
                tdForm.innerHTML = `<input type='button' value='delete' id='delete${index + 1}' class='delete'>`;
            }
            else {
                tdForm.textContent = value1[1];
            }
            tr.appendChild(tdForm)
        })
        GetS('.table-user').appendChild(tr);
    })
}
function editUser(Edit) {
    // a. Дізнаєтеся в якому рядку ви клікнули(тобто індекс).
    let regEdit = /\d{1,}$/g;
    let findEdit: any = regEdit.exec(Edit);
    // b. По цьому індексу витягуємо конкретрний елемент(тобто об’єкт) з масиву.
    let editObj = Object.fromEntries(User[findEdit[0] - 1])
    // c. З об’єкт достаємо дані і передаємо в форму(тобто у value інпутів).
    GetS('.login').value = editObj.login;
    GetS('.password').value = editObj.password;
    GetS('.email').value = editObj.email;
    // d. Запам’ятовуємо даний індекс в змінну userIndex.
    userIndex = findEdit[0] - 1;
    // e. Показуємо кнопку Edit user і приховуємо Add user.
    GetS('.add-user').classList.add('hide');
    GetS('.edit-user').classList.remove('hide');
}
function deleteUser(Delete) {
    // a. Дізнаєтеся в якому рядку ви клікнули(тобто індекс).
    let regDelete = /\d{1,}$/g;
    let findDelete: any = regDelete.exec(Delete);
    // b. По цьому індексу видаляємо елемент з масиву.
    User.splice(findDelete[0] - 1, 1)
    // c. Запускаєм заново функцію render().
    render();
}

GetS('.table-user').addEventListener('click', function (event) {
    if (event.target.value == 'delete') {
        deleteUser(event.target.id)
    }
    else if (event.target.value == 'edit') {
        editUser(event.target.id)
    }
})
function saveEditUser() {
    // a. Стягуєте дані з полів і формує об’єкт через клас.
    class NewData {
        constructor(
            public login: string,
            public password: string,
            public email: string,
            public edit: string,
            public del: string
            ) {}
    }

    let EditData:NewData = new NewData(GetS('.login').value, GetS('.password').value, GetS('.email').value, 'edit', 'delete');
    // b. Цей об’єкт додається на місце старого об’єкту через userIndex.
    User[userIndex] = Object.entries(EditData)
    // c. Поля зачищає.
    GetS('.form-user').reset();
    // d. Запускаєм функцію render() яка генерую всю інфу в таблицю відносно вашого масиву.
    GetS('.add-user').classList.remove('hide');
    GetS('.edit-user').classList.add('hide');
    render();
}
GetS('.edit-user').addEventListener('click', function () {
    saveEditUser();
})