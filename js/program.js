$(function () {

    if (!isLogin()) {
        // redirect to login page
        window.location.replace("http://localhost:63342/final-exam-web/html/loginform.html");
        return;
    }

    $(".header").load("header.html");

    $(".main").load("home.html");

    $(".footer").load("footer.html");
});

function isLogin() {
    if (localStorage.getItem("ID")) {
        return true;
    }
    return false;
}

function logout() {
    localStorage.removeItem("ID");
    localStorage.removeItem("FULL_NAME");
    localStorage.removeItem("FIRST_NAME");
    localStorage.removeItem("LAST_NAME");
    localStorage.removeItem("ROLE");
    localStorage.removeItem("USERNAME");
    localStorage.removeItem("PASSWORD");

    // redirect to login page
    window.location.replace("http://localhost:63342/final-exam-web/html/loginform.html");

}

function showSuccessSnackBar(snackbarMessage) {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");
    x.innerHTML = snackbarMessage;

    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}