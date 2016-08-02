var req = new XMLHttpRequest();
//req.open('GET', 'http://localhost:3000/getall', true);
req.open('GET', 'http://52.35.2.29:3000/getall', true);
req.addEventListener('load', function(){
    if (req.status < 400){
        var data = JSON.parse(req.responseText);
        var tbl = document.body.appendChild(buildTable(data));
    } else {
        console.log("Error in network request: " + request.statusText);
    }
});
req.send(null);

