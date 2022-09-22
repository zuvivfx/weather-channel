let input = document.querySelector("input")
let spanCiudad = document.querySelector("#ciudad");
let tmp = document.querySelector("#temperatura");
let descripcion = document.querySelector("#descripcion");
let wicon = document.querySelector("#wicon");
let pais = document.querySelector("#pais")

let enviar = document.querySelector("button")
enviar.addEventListener("click", function () {
    let ciudad = input.value;
    if (input.value == "" || null) {
        alert("Select a city")
        document.querySelector(".container").style.visibility = "hidden"
        return
    }
    cargarCiudad(ciudad);
    input.value = "";
})

input.addEventListener("keydown", function (e) {
    if (e.code == "Enter") {
        let ciudad = input.value;
        if (input.value == "") {
            alert("Ingrese una ciudad")
        }
        cargarCiudad(ciudad);
        document.querySelector(".container").style.visibility = "visible"
        input.value = "";
    }
});

function cargarCiudad(ciudad) {
    $.getJSON("https://api.openweathermap.org/data/2.5/weather?q=" + ciudad +"&appid=dcec7df661b1e6b0edab51d796b7339c", function(data) {
        // console.log(data);
        spanCiudad.textContent = data.name; 
        pais.textContent = data.sys.country; 
        // console.log(data.name)
        tmp.textContent = `${Math.round(data.main.temp - 273.15)}°C`; 
        descripcion.textContent = data.weather[0].description;
        let icon = data.weather[0].icon;
        wicon.setAttribute("src", "http://openweathermap.org/img/wn/" + icon + "@2x.png"
        );
        console.log(data)
    })
    .fail( function (error) {
        document.querySelector(".container").style.visibility = "hidden"
        alert( "Error, the inserted city was not found!");
        return
    }) 
}
