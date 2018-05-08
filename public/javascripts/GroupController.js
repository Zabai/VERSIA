function CreateGroupController() {
    var controller = {};

    controller.initialize =
        function() {
            function disableScrollWithArrowKeys() {
                window.addEventListener("keydown", function(event) {
                    // space and arrow keys
                    if([37, 38, 39, 40].indexOf(event.keyCode) > -1) {
                        event.preventDefault();
                    }
                }, false);
            }

            function setUpData() {
                controller.friends = friends;
                controller.members = [];
            }

            function setUpEvents() {
                $('#append-member').keyup(function(event) {
                    controller.autocomplete(event, this.value);
                });
                $('#create-group').submit(
                    function(event) {
                        event.preventDefault();
                        if(controller.check()) {
                            controller.submit();
                        } else return false;
                    }
                );
            }

            disableScrollWithArrowKeys();
            setUpData();
            setUpEvents();
        };

    controller.autocomplete =
        function(event, studentName) {
            if(event.keyCode !== 40) {
                var list = $('#friends');
                list.html("");

                this.friends.forEach(function(friend, index) {
                    var name = friend.name.toString();
                    name = name.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
                    studentName = studentName.normalize('NFD').replace(/[\u0300-\u036f]/g, "");

                    var regex = new RegExp("^" + studentName, "gmi");
                    if(studentName.toString().length >= 3)
                        if(name.match(regex)) {
                            var record =
                                "<li id='" + index + "' class=\"list-group-item list-group-item-action\" tabindex=\"-1\">" +
                                "<img class=\"rounded-circle mr-2\" src=\"https://picsum.photos/g/40/40\" alt=\"img\">\n" +
                                friend.name +
                                "\n</li>";

                            var newElement = $(record);
                            newElement.keyup(function(event) {
                                controller.navigate(event, this, controller.addToGroup);
                            }).click(function() {
                                controller.addToGroup(this);
                            });

                            list.append(newElement);
                        }
                });
            } else {
                $('#friends').children().first().focus();
            }
        };

    controller.navigate =
        function(event, element, action) {
            var upKey = 38,
                downKey = 40,
                enterKey = 13;

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
        };

    controller.addToGroup =
        function(element) {
            var input = $("#append-member");

            function resetFields() {
                input.val("");
                $('#friends').html("");
            }

            function addMemberToGroup() {
                var index = $(element).attr('id');
                var record =
                    "<li id='" + index + "' class=\"list-group-item d-flex align-items-center\">\n" +
                    "<img class=\"rounded-circle mr-2\" src=\"https://picsum.photos/g/40/40\" alt=\"img\">\n" +
                    controller.friends[index].name +
                    "\n<button class=\"btn btn-sm btn-danger ml-auto\"><i class=\"fas fa-times\"></i></button>\n" +
                    "</li>";


                var newElement = $(record);
                newElement.find("button").click(function() {
                    controller.removeFromGroup($(this).parent());
                });

                $('#members').append(newElement);

                controller.members.push(controller.friends[index]);
                controller.friends.splice(index, 1);
            }

            function recoverFocus() {
                input.focus();
            }

            resetFields();
            addMemberToGroup();
            recoverFocus();
        };

    controller.removeFromGroup =
        function(element) {
            var index = $(element).attr("id");

            $(element).remove();

            controller.friends.push(controller.members[index]);
            controller.members.splice(index, 1);
        };

    controller.check =
        function() {
            if(this.members.length >= 1) return true;
            $('#append-member')
                .popover({content: "No ha añadido usuarios", placement: "bottom"})
                .click();
            return false;
        };

    controller.submit =
        function() {
            function createGroup() {
                var group = {};

                group.name = $("#groupname").val();
                group.description = $("#description").val();
                group.members = [];
                for(var i = 0; i < controller.members.length; i++) {
                    group.members.push(controller.members[i].id);
                }

                return group;
            }

            function sendGroup(group) {
                $.ajax({
                    method: "POST",
                    url: "/home/group/",
                    data: {group: group}
                }).done(function(msg) {
                    window.location.replace(msg);
                });
            }

            sendGroup(JSON.stringify(createGroup()));
        };


    return controller;
}