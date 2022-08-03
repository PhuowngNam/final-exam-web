function Account(id, username, lastName, firstName, role, departmentId,
    departmentName) {
    this.id = id;
    this.username = username;
    this.lastName = lastName;
    this.firstName = firstName;
    this.role = role;
    this.departmentId = departmentId;
    this.departmentName = departmentName;
}

const baseApi = "http://localhost:8080/api/v1"
const accountList = [];
const url = baseApi + "/accounts";

// crud service: start
function getAccountList() {
    // call API from server
    $.get(url, function (data, status) {

        // reset list employees
        this.accountList = [];

        // error
        if (status === "error") {
            // TODO
            alert("Error when loading data");
            return;
        }

        // success
        parseAccountData(data);
        fillAccountToTable();
    });
}

function createAccount() {
    // get data
    let username = document.getElementById("username").value;
    let lastName = document.getElementById("lastName").value;
    let firstName = document.getElementById("firstName").value;
    let role = document.getElementById("role").value;
    let departmentId = document.getElementById("departmentId").value;

    // TODO validate
    // then fail validate ==> return;

    const account = {
        username: username,
        lastName: lastName,
        firstName: firstName,
        role: role,
        departmentId: Number(departmentId),
    };

    $.ajax({
        url: url,
        type: 'POST',
        data: JSON.stringify(account), // body
        contentType: "application/json", // type of body (json, xml, text)
        success: function (data, textStatus, xhr) {
            hideModal();
            showSuccessAlert();
            buildAccountTable();
        },
        error(jqXHR, textStatus, errorThrown) {
            alert("Có lỗi khi tạo tài khoản");
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}

function updateAccount() {
    const id = document.getElementById("id").value;
    const username = document.getElementById("username").value;
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const role = document.getElementById("role").value;
    const departmentId = document.getElementById("departmentId").value;

    // TODO validate
    // then fail validate ==> return;

    const account = {
        id: Number(id),
        username: username,
        firstName: firstName,
        lastName: lastName,
        role: role,
        departmentId: Number(departmentId)
    };

    $.ajax({
        url: url + "/" + id,
        type: 'PUT',
        data: JSON.stringify(account),
        contentType: "application/json", // type of body (json, xml, text)
        success: function (result) {
            // error
            if (!result) {
                alert("Có lỗi khi cập nhật tài khoản");
                return;
            }

            // success
            hideModal();
            showSuccessAlert();
            buildAccountTable();
        }
    });
}

function deleteAccount(id) {
    // TODO validate
    $.ajax({
        url: url + "/" + id,
        type: 'DELETE',
        success: function(result) {
            // error
            if (!result) {
                alert("Có lỗi khi xóa tài khoản");
                return;
            }

            // success
            showSuccessAlert();
            buildAccountTable();
        }
    });
}

// crud service: end

function clickNavAccountList() {
    $(".main").load("accountList.html");
    buildAccountTable();
}

function buildAccountTable() {
    $('tbody').empty();
    getAccountList();
}

function parseAccountData(data) {
    data.content.forEach(function (item) {
        accountList.push(new Account(item.id, item.username, item.lastName,
            item.firstName, item.role, item.departmentId, item.departmentName));
    });
    console.log("accountList")
    console.log(accountList)
}

function fillAccountToTable() {
    accountList.forEach(function (item) {
        $('tbody').append(
            '<tr>' +
            '<td>' + item.id + '</td>' +
            '<td>' + item.username + '</td>' +
            '<td>' + item.firstName + '</td>' +
            '<td>' + item.lastName + '</td>' +
            '<td>' + item.departmentName + '</td>' +
            '<td>' +
            '<a class="edit" title="Edit" data-toggle="tooltip" onclick="openUpdateAccountModal('
            + item.id + ')">'
            + '<i class="material-icons">&#xE254;</i>'
            + '</a>' +
            '<a class="delete" title="Delete" data-toggle="tooltip" onclick="openConfirmDelete('
            + item.id + ')">'
            + '<i class="material-icons">&#xE872;</i>'
            + '</a>' +
            '</td>' +
            '</tr>')
    });
}

function openCreateAccountModal() {
    resetForm();
    openModal();
}

function openUpdateAccountModal(id) {

    // get index from employee's id
    const index = accountList.findIndex(x => x.id === id);

    // fill data
    document.getElementById("id").value = accountList[index].id;
    document.getElementById("username").value = accountList[index].username;
    document.getElementById("firstName").value = accountList[index].firstName;
    document.getElementById("lastName").value = accountList[index].lastName;
    document.getElementById("role").value = accountList[index].role;
    document.getElementById("departmentId").value = accountList[index].departmentId;

    openModal();
}

function openConfirmDelete (id) {
    // get index from employee's id
    const index = accountList.findIndex(x => x.id === id);
    const name = accountList[index].name;

    const result = confirm("Bạn có muốn xóa " + name + " không?");
    if (result) {
        deleteAccount(id);
    }
}

function resetForm() {
    document.getElementById("username").value = "";
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("role").value = "";
    document.getElementById("departmentId").value = "";
}

function openModal() {
    $('#myCreateAccountModal').modal('show');
}

function hideModal() {
    $('#myCreateAccountModal').modal('hide');
}

function showSuccessAlert() {
    $("#success-alert").fadeTo(2000, 500).slideUp(500, function () {
        $("#success-alert").slideUp(500);
    });
}

function saveAccount() {
    const id = document.getElementById("id").value;

    if (!id) {
        createAccount();
    } else {
        updateAccount();
    }
}

