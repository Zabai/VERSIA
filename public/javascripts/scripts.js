function enableScrollNavbar() {
    var navbar = $('.navbar');
    var distance = 25;

    $(window).scroll(function() {
        if (document.body.scrollTop > distance || document.documentElement.scrollTop > distance) {
            navbar.removeClass('bg-transparent');
            navbar.addClass('bg-dark');
        } else {
            navbar.removeClass('bg-dark');
            navbar.addClass('bg-transparent');
        }
    });
}

function enableDinamicAuthForms() {
    $('.message a').click(function(){
        $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
    });
}

function setUpLandingPage() {
    enableScrollNavbar();
    enableDinamicAuthForms();
}

/**/
function setUpProfileToggle() {
    var toggle = $('#toggle');

    toggle.bootstrapToggle({
        offstyle: "primary",
        onstyle: "success",
        off: "Editar",
        on: "Guardar"
    });

    toggle.change(function toggleInputs() {
        var inputs = $('#form-profile input');

        if(toggle.prop("checked")) {
            inputs.each(function(index) {
                if(index < inputs.length - 4)
                    $(this).removeAttr("disabled");
            });
        } else {
            inputs.each(function(index) {
                if($(this).attr("id") !== "toggle")
                    $(this).attr("disabled", "");
            });
        }
    });
}

function addFriend(email){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            location.reload();
        } else console.log("Por si la cosa va mal");
    };

    request.open("POST", "/home/users/friends/add", true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send(encodeURI("email=" + email));
}

function undoFriendReq(email){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            location.reload();
        } else console.log("Por si la cosa va mal");
    };

    request.open("PUT", "/home/users/friends/undo", true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send(encodeURI("email=" + email));
}

function updateUser(email){
    if(!$('#toggle').prop("checked")){
        $.post("/home/users/"+email+"/edit",
            {name: $('#inputName').val(), surname: $('#inputSurname').val(), email: $('#inputEmail').val()},
            function(data, status){
                if(status==="success"){
                    location.reload();
                }
                else{
                    alert("Ha habido un problema con el POST.");
                }
            });
    }
}