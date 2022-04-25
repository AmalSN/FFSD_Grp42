function check(){
    let username = $("#uName").val();
    let email = $("#email").val();
    let password = $("#password").val();
    let confirmPassword = $("#passwordConfirm").val();
    if(username.length >= 6 && password.length >= 6 && password == confirmPassword && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        $("#signup-button").removeAttr("disabled");
    }
    else {
        $("#signup-button").prop("disabled", true);
    }
}

$(document).ready(function () {
    $(".modal").modal('show');
});