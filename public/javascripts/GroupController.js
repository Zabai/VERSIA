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
                    var list = $('#members');
                    list.html("");

                    friends.forEach(function(friend, index) {
                        var name = friend.name.toString();
                        name = name.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
                        studentName = studentName.normalize('NFD').replace(/[\u0300-\u036f]/g, "");

                        var regex = new RegExp("^" + studentName, "gmi");
                        if(studentName.toString().length >= 3)
                            if(name.match(regex)) {
                                var actual = list.html();
                                var record =
                                    "<li id='" + index + "' class=\"list-group-item list-group-item-action\" tabindex=\"-1\" " +
                                    "onkeyup='CreateGroupController().navigate(event, this, CreateGroupController().addToGroup)'>\n" +
                                    "<img class=\"rounded-circle mr-2\" src=\"https://picsum.photos/g/40/40\" alt=\"img\">\n" +
                                    friend.name +
                                    "\n</li>";

                                list.html(actual + record);
                            }
                    });
                } else {
                    $('#members').children().first().focus();
                }
            },
        navigate:
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
            },
        addToGroup:
            function addMemberToGroup(element) {
                console.log("ESTO RULA");
            }
    };
}