function enableScrollNavbar() {
    var navbar = $('.navbar');
    var distance = 25;

    $(window).scroll(function() {
        if(document.body.scrollTop > distance || document.documentElement.scrollTop > distance) {
            navbar.removeClass('bg-transparent');
            navbar.addClass('bg-dark');
        } else {
            navbar.removeClass('bg-dark');
            navbar.addClass('bg-transparent');
        }
    });
}

function enableDinamicAuthForms() {
    $('.message a').click(function() {
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
    request.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
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
    request.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
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
    console.log(id);
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if(this.readyState === 4 && this.status === 200) {
            var listElement = $(button).parent().parent();
            $(listElement).hide('slow', function() {
                $(listElement).remove();
            });
        } else {
            console.error('ERROR AJAX: ', request.responseText);
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
            $(listElement).hide('slow', function() {
                $(listElement).remove();
            });
        } else console.log(this.statusText);
    };

    request.open("DELETE", "/home/users/friends/decline?_method=DELETE", true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send(encodeURI("id=" + id));
}

function passData(userData, senderEmail){
    $("#receiverEmail").val(userData.email);
    $("#receiverEmailTitle").text(userData.name);
    $("#senderEmail").val(senderEmail);
}

function sendEmail(){
    if($.trim($("#messageContent").val())===""){
        $("#messageContent").popover({content: "Si quiere mandar un mensaje tendrá que rellenar este campo primero..."});
        $("#messageContent").click();
    } else {
        $.post("/home/users/messages/send",
            {from: $('#senderEmail').val(), to: $('#receiverEmail').val(), content: $('#messageContent').val()},
            function(data, status) {
                if(status === "success") {
                    alert("Mensaje enviado!");
                }
                else {
                    alert("Ha habido un problema con el POST.");
                }
            });
    }
}

function removeFriend(){
    var button = $('#friendRemovalBtn');
    var friendId = button.data("friend");
    var myId = button.data("me");
    $.ajax({
        method: "DELETE",
        data: {friendId: friendId, myId: myId},
        url: "/home/users/friends/remove"
    }).done(function(data, status){
        if(status === "success"){
            console.log("HAS PERDIDO A OTRO AMIGO.");
            location.reload();
        }
    });
}

function sendPost(){
    if($.trim($("#content").val())==="") {
        $("#content").popover({content: "Si quiere postear algo debería de rellenar este campo primero..."});
        $("#content").click();
    } else{
        $.ajax({
            method: "POST",
            data: {content: $("#content").val()},
            url: "/home/posts/new"
        }).done(function(data, status){
            if(status === "success"){
                location.reload();
            }
        });
    }
}

var textAux = "";
function editPostEnable(post, cancelEdit){
    var textArea = $("#post"+post);
    if(!cancelEdit) {
        textAux = textArea.val();
        textArea.attr("readonly", false);
    } else {
        textArea.val(textAux);
        textArea.attr("readonly", true);
    }
    $(".editBtn").toggle();
    $(".editOptions").toggle();
}

function confirmEdit(post){
    if($.trim($("#post"+post).val())==="") {
        $("#post"+post).popover({content: "Si quiere postear algo debería de rellenar este campo primero..."});
        $("#post"+post).click();
    } else{
        $.ajax({
            method: "POST",
            data: {
                content: $("#post"+post).val()
            },
            url: "/home/posts/" + post +"/edit"
        }).done(function(data, status){
            if(status === "success"){
                console.log("DONE");
                editPostEnable(post, true);
            }
        });
    }
}