document.addEventListener('DOMContentLoaded', bindButtons);
var apiKey = "&appid=5fbc762a4cf808a85eabe62719260795";

function bindButtons()
{
    document.getElementById('citySubmit').addEventListener('click', function(event)
    {
        var req = new XMLHttpRequest();
        var city = document.getElementById('city').value;
        var url = "http://api.openweathermap.org/data/2.5/weather?q="
        req.open("GET", url + city + apiKey, true);

        req.addEventListener('load', function()
        {
            if(req.status >= 200 && req.status < 400) 
            {
                var response = JSON.parse(req.responseText);
            
                document.getElementById('cityChosen').textContent = response.name;
                document.getElementById('country').textContent = response.sys.country;
                document.getElementById('temp').textContent = response.main.temp;
                document.getElementById('pressure').textContent = response.main.pressure;
                document.getElementById('humidity').textContent = response.main.humidity;
            } 

            else 
            {
                console.log("Error in network request: " + request.statusText);
            }
        });
        req.send(null);
        event.preventDefault();
    });


    document.getElementById('zipSubmit').addEventListener('click', function(event)
    {
        var req = new XMLHttpRequest();
        var zip = document.getElementById('zip').value;
        var url = "http://api.openweathermap.org/data/2.5/weather?q="
        req.open("GET", url + zip + apiKey, true);

        req.addEventListener('load', function()
        {
            if(req.status >= 200 && req.status < 400) 
            {
                var response = JSON.parse(req.responseText);

                document.getElementById('cityChosen').textContent = response.name;
                document.getElementById('country').textContent = response.sys.country;
                document.getElementById('temp').textContent = response.main.temp;
                document.getElementById('pressure').textContent = response.main.pressure;
                document.getElementById('humidity').textContent = response.main.humidity;
            } 

            else 
            {
                console.log("Error in network request: " + request.statusText);
            }
        });
        req.send(null);
        event.preventDefault();
    });


    
    document.getElementById('wordSubmit').addEventListener('click', function(event)
    {
        var req = new XMLHttpRequest();
        var userName = document.getElementById('name').value;
        var input = document.getElementById('word').value;
        var payload = {'name': userName, 'word': input};
        req.open("POST", "http://httpbin.org/post", true);
        req.setRequestHeader('Content-Type', 'application/json');

        req.addEventListener('load', function()
        {
            if(req.status >= 200 && req.status < 400) 
            {
                var response = JSON.parse(req.responseText);
                var data = JSON.parse(response.data);
                document.getElementById('inputName').textContent = data.name;
                document.getElementById('inputWords').textContent = data.word;
            } 

            else 
            {
                console.log("Error in network request: " + request.statusText);
            }
        });
        req.send(JSON.stringify(payload));
        event.preventDefault();
    });
}
