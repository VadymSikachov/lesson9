const GetS = sel => document.querySelector(sel);
var User = [];
let userIndex;
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
});
function addUser() {
    if (validate()) {
        let obj = {
            login: GetS('.login').value,
            password: GetS('.password').value,
            email: GetS('.email').value,
            edit: 'edit',
            delete: 'delete'
        };
        User.push(Object.entries(obj));
        GetS('.form-user').reset();
        render();
    }
}
function render() {
    let elemParrent = GetS('.table-user');
    elemParrent.replaceChildren();
    let Head = document.createElement('tr');
    Head.classList.add('head-user');
    Head.innerHTML = `<td>#</td><td>Login</td><td>Password</td><td>Email</td><td>Edit</td><td>Delete</td>`;
    GetS('.table-user').appendChild(Head);
    User.forEach(function (value, index) {
        let tr = document.createElement('tr');
        let td = document.createElement('td');
        td.textContent = (index + 1).toString();
        tr.appendChild(td);
        value.forEach(function (value1) {
            let tdForm = document.createElement('td');
            if (value1[1] == 'edit') {
                tdForm.innerHTML = `<input type='button' value='edit' id='edit${index + 1}' class='edit'>`;
            }
            else if (value1[1] == 'delete') {
                tdForm.innerHTML = `<input type='button' value='delete' id='delete${index + 1}' class='delete'>`;
            }
            else {
                tdForm.textContent = value1[1];
            }
            tr.appendChild(tdForm);
        });
        GetS('.table-user').appendChild(tr);
    });
}
function editUser(Edit) {
    let regEdit = /\d{1,}$/g;
    let findEdit = regEdit.exec(Edit);
    let editObj = Object.fromEntries(User[findEdit[0] - 1]);
    GetS('.login').value = editObj.login;
    GetS('.password').value = editObj.password;
    GetS('.email').value = editObj.email;
    userIndex = findEdit[0] - 1;
    GetS('.add-user').classList.add('hide');
    GetS('.edit-user').classList.remove('hide');
}
function deleteUser(Delete) {
    let regDelete = /\d{1,}$/g;
    let findDelete = regDelete.exec(Delete);
    User.splice(findDelete[0] - 1, 1);
    render();
}
GetS('.table-user').addEventListener('click', function (event) {
    if (event.target.value == 'delete') {
        deleteUser(event.target.id);
    }
    else if (event.target.value == 'edit') {
        editUser(event.target.id);
    }
});
function saveEditUser() {
    class NewData {
        login;
        password;
        email;
        edit;
        del;
        constructor(login, password, email, edit, del) {
            this.login = login;
            this.password = password;
            this.email = email;
            this.edit = edit;
            this.del = del;
        }
    }
    let EditData = new NewData(GetS('.login').value, GetS('.password').value, GetS('.email').value, 'edit', 'delete');
    User[userIndex] = Object.entries(EditData);
    GetS('.form-user').reset();
    GetS('.add-user').classList.remove('hide');
    GetS('.edit-user').classList.add('hide');
    render();
}
GetS('.edit-user').addEventListener('click', function () {
    saveEditUser();
});
