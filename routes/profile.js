$(document).ready(function () {
    $("#disableData").click(function () {
        var checked = $(this).prop("checked");
        if(checked==true)
            $("#data" + ":input").prop("disabled",false)
        else
            $("#data" + ":input").prop("disabled",true)

    })

})