function markAsDone(id, job){
    console.log("HOLA");
    var xhttp = new XMLHttpRequest();
    var json= {
        "done" : 1,
        "job" : job
    };
    xhttp.open("post", "/"+id+"?_method=put", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(json);
    location.reload();
}