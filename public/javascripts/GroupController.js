function CreateGroupController() {
    return {
        initialize:
            function() {
                function disableScrollWithArrowKeys() {
                    window.addEventListener("keydown", function(e) {
                        // space and arrow keys
                        if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
                            e.preventDefault();
                        }
                    }, false);
                }

                disableScrollWithArrowKeys();
            },
        autocomplete:
            function(event, studentName) {
                if(event.keyCode !== 40) {
                    var list = $('#friends');
                    list.html("");

                    friends.forEach(function(friend, index) {
                        var name = friend.name.toString();
                        name = name.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
                        studentName = studentName.normalize('NFD').replace(/[\u0300-\u036f]/g, "");

                        var regex = new RegExp("^" + studentName, "gmi");
                        if(studentName.toString().length >= 3)
                            if(name.match(regex)) {
                                var record =
                                    "<li id='" + index + "' class=\"list-group-item list-group-item-action\" tabindex=\"-1\" " +
                                    "onkeyup='controller.navigate(event, this, controller.addToGroup)'>\n" +
                                    "<img class=\"rounded-circle mr-2\" src=\"https://picsum.photos/g/40/40\" alt=\"img\">\n" +
                                    friend.name +
                                    "\n</li>";
                                list.append($(record));
                            }
                    });
                } else {
                    $('#friends').children().first().focus();
                }
            },
        navigate:
            function(event, element, action) {
                var upKey = 38,
                    downKey = 40,
                    enterKey = 13;
                console.log(event.keyCode);

                switch(event.keyCode) {
                    case upKey:
                        var prev = $(element).prev();

                        if(prev.length)
                            prev.focus();
                        else
                            $('#append-member').focus();
                        break;
                    case downKey:
                        var next = $(element).next();

                        if(next.length)
                            next.focus();
                        else
                            $('#append-member').focus();
                        break;
                    case enterKey:
                        action(element);
                        break;
                    default:
                        break;
                }
            },
        addToGroup:
            function addMemberToGroup(element) {
                var input = $("#append-member");

                function resetFields() {
                    input.val("");
                    $('#friends').html("");
                }

                function addMemberToGroup() {
                    var index = $(element).attr('id');
                    var membersList = $('#members');

                    var actual = membersList.html();
                    var record =
                        "<li class=\"list-group-item d-flex align-items-center\">\n" +
                        "<img class=\"rounded-circle mr-2\" src=\"https://picsum.photos/g/40/40\" alt=\"img\">\n" +
                        friends[index].name +
                        "\n<button class=\"btn btn-sm btn-danger ml-auto\"><i class=\"fas fa-times\"></i></button>\n" +
                        "</li>";

                    membersList.html(actual + record);
                    members.push(friends[index]);
                    friends.splice(index, 1);
                }

                function recoverFocus() {
                    input.focus();
                }

                resetFields();
                addMemberToGroup();
                recoverFocus();
            }
    };
}