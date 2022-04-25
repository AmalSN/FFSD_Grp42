$(document).ready(function () {
    $(".modal").modal('show');
});

function check(){
    let password = $("#password").val();
    let confirmPassword = $("#confirmPassword").val();
    if(password.length >= 6 && password == confirmPassword){
        $("#submit").removeAttr("disabled");
    }
    else{
        $("#submit").prop("disabled", true);
    }
}