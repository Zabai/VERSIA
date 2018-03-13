function markAsDone(id, job) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            location.reload();
        }
    };

    request.open("POST", "/" + id + "?_method=PUT", true);
    request.setRequestHeader("Content-type", "application/json");
    request.send(JSON.stringify({
        "job": job,
        "done": 1
    }));
}