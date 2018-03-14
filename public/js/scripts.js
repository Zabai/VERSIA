var jobIdToEdit;
function selectJob(job_id, job_value){
    jobIdToEdit = job_id;
    document.getElementById("modal_input").value = job_value;
}
function markAsDone(id, job){
    var req = new XMLHttpRequest();
    req.onreadystatechange = reload;
    sendEditReq(req, id, job, 1);
}

function editJob(){
    var req = new XMLHttpRequest();
    req.onreadystatechange = reload;
    sendEditReq(req, jobIdToEdit, document.getElementById("modal_input").value, 0);
}

function reload(){
    if(this.readyState === 4 && this.status === 200)
        location.reload();
}

function sendEditReq(request, id, job, done){
    request.open("POST", "/" + id + "?_method=PUT", true);
    request.setRequestHeader("Content-type", "application/json");
    request.send(JSON.stringify({
        "job": job,
        "done": done
    }));
}