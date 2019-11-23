function outputWheatherFunc(json)
{
	
	document.getElementsByClassName("main")[0].style.display = "flex";
	document.getElementById("clearButton").style.display = "inline";
	

	let name=document.getElementById("name");
	name.innerHTML=json.name+" "+json.sys.country+"<br>";
	name.innerHTML+=json.coord.lat+" "+json.coord.lon+"<br>";
	

	let temp=document.getElementById("temperature");
	temp.innerHTML=Math.round(json.main.temp-273)+" °C";
	

	let weath=document.getElementById("weather");
	weath.innerHTML="Today is "+json.weather[0].main;
	

	let img=document.getElementById("icon");
	img.src="http://openweathermap.org/img/wn/"+(json.weather[0].icon)+"@2x.png";
	

	let pressure=document.getElementById("weather");
	pressure.innerHTML+="<br>Pressure: "+(json.main.pressure*0.75).toFixed(2)+" mm Hg";
	

	let humidity=document.getElementById("weather");
	humidity.innerHTML+="<br>Humidity: "+(json.main.humidity)+"%";
	

	let clouds=document.getElementById("weather");
	clouds.innerHTML+="<br>Clouds: "+(json.clouds.all)+"%";

	document.getElementsByClassName("info")[0].style.display = "flex";
	
}
function notFoundFunc()
{
	document.getElementsByClassName("main")[0].style.display = "flex";
	document.getElementById("clearButton").style.display = "flex";

	let name=document.getElementById("name");
	name.innerHTML="City not found";
	document.getElementsByClassName("info")[0].style.display = "none";
}
function buttonChangeFunc()
{
	var textField=document.getElementById("cityName");
	if(textField.value!=="")
	{
		document.getElementById("submitButton").disabled=false;
	}
	else
	{
		document.getElementById("submitButton").disabled=true;
	}
}
function sendRequest(){
    let city = document.getElementById('cityName').value;
	let url = "https://api.openweathermap.org/data/2.5/weather?q=" + city  + "&appid=5d60c80406f8941039d85837e08019a1";

    let xhr = createCORSRequest('GET', url);
	if (!xhr) {
    	window.alert('CORS not supported');
  	}
  	xhr.send();
  	xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        	let json = JSON.parse(xhr.responseText);
        	outputWheatherFunc(json);
        } 
        else {
        	notFoundFunc();     
        }
    } 
}

function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
    	xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
     	xhr = new XDomainRequest();
    	xhr.open(method, url);
    } else {
    	xhr = null;
    }
    return xhr;
  }

function submitFunction(event){
  	event.preventDefault();
	sendRequest();
}

function clearFunc(){
	document.getElementById("cityName").value="";
	document.getElementsByClassName("main")[0].style.display = "none";
	document.getElementById("clearButton").style.display = "none";
}