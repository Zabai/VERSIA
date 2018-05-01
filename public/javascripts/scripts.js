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

function addFriend(id){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            location.reload();
        } else {
            console.log(request.responseText);
        }

    };
    request.open("POST", "/home/users/friends/add", true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send(encodeURI("id=" + id));
}

function undoFriendReq(id){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            location.reload();
        } else console.log(request.responseText);
    };

    request.open("PUT", "/home/users/friends/undo", true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send(encodeURI("id=" + id));
}

function updateUser(id){
    if(!$('#toggle').prop("checked")){
        $.post("/home/users/"+id+"/edit",
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

function acceptFriend(button, id) {
    $(button).attr("disabled", "");
    $(button).next().attr("disabled", "");

    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {
        if(this.readyState === 4 && this.status === 200) {
            var listElement = $(button).parent().parent();
            $(listElement).hide('slow', function(){
                $(listElement).remove();
            });
        }
    };

    request.open("PUT", "/home/users/friends/accept?_method=PUT", true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send(encodeURI("id=" + id));
}

function declineFriend(button, id) {
    $(button).attr("disabled", "");
    $(button).prev().attr("disabled", "");

    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {
        if(this.readyState === 4 && this.status === 200) {
            var listElement = $(button).parent().parent();
            $(listElement).hide('slow', function(){
                $(listElement).remove();
            });
        } else console.log(this.statusText);
    };

    request.open("DELETE", "/home/users/friends/decline?_method=DELETE", true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send(encodeURI("id=" + id));
}

function passData(userData, senderEmail){

    console.log('funcion passData: ');
    console.log(userData);
    $("#receiverEmail").val(userData.email);
    $("#receiverEmailTitle").text(userData.name);
    $("#senderEmail").val(senderEmail);
}

function sendEmail(){
    if($("#messageContent").val()===""){
        $("#messageContent").popover({content: "Si quiere mandar un mensaje tendrá que rellenar este campo primero..."});
        $("#messageContent").click();
    }else{
        $.post("/home/users/messages/send",
            {from: $('#senderEmail').val(), to: $('#receiverEmail').val(), content: $('#messageContent').val()},
            function(data, status){
                if(status==="success"){
                    alert("Mensaje enviado!");
                }
                else{
                    alert("Ha habido un problema con el POST.");
                }
            });
    }
}