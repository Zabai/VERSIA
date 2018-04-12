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
                if(index < inputs.length - 3)
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
function changeData() {
    var name = $('#inputName').attr("value");
    var surname = $('#inputSurname').attr("value");
    var email = $('#inputEmail').attr("value");
    var toggle = $('#toggle');

    toggle.change(function () {
        if(!toggle.prop("checked")) {
            var change = "";
            var res;
            if (res=$('#inputName').attr("value")!==name){
                name = res;
                change = "name=" + name;
            }
            if (res=$('#inputSurname').attr("value")!==surname){
                surname = res;
                if (change.length === 0)
                    change = "surname=" + surname;
                else
                    change += ", surname=" + surname;
            }
            if (res=$('#inputEmail').attr("value")!==email){
                if (change.length === 0)
                    change = "email=" + res;
                else
                    change += ", email=" + res;
            } else
                res = email;
            if (change.length !== 0){
                var request = new XMLHttpRequest();
                request.open("PUT", "/home/users/edit", true);
                request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                request.send(JSON.stringify({"change": change, "email": email}));
                email = res;
            }

        }

    })


}

function addFriend(email){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            console.log(email);
        else console.log("Por si la cosa va mal");
    };

    request.open("POST", "/home/users/friends/add", true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send(encodeURI("email=" + email));
}