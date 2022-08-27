function onClick(event) {
    event.preventDefault();

    const mensaje = {
        nombre: document.getElementById('name').value,
        apellido: document.getElementById('apellido').value,
        dni: document.getElementById('dni').value,
        email: document.getElementById('email').value,
        telefono: document.getElementById('telefono').value
    }
    console.log(mensaje);


    fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify(mensaje),
        headers: { "Content-type": "application/json; charset=UTF-8" },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            Swal.fire(
                'Enviado correctamente',
                'Gracias',
                'success',
            );
            cleanForm();
        })
        .catch((err) => console.log(err));

}

function cleanForm() {
    let formulario = document.getElementById('formulario');
    formulario.reset();
}

let boton = document.getElementById("enviar");
boton.addEventListener("click", onClick);

// ------------------seccion clima----------------- 

async function obtenerClimaDia() {
    try {
        let respuesta = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=-24.182673866114143&lon=-65.33121206931652&appid=7e0e756c0bb5247d4b74e950b8e8b8b2&units=metric&lang=es')
        let clima = await respuesta.json();
        let { main, name, weather } = clima;
        document.getElementById('clima-grados').textContent = Math.round(main.temp) + '°C';
        document.getElementById('clima-img').src = 'http://openweathermap.org/img/wn/' + weather[0].icon + '@2x.png';
        document.getElementById('clima-feelslike').textContent = "Sensacion termiaca: " + Math.round(main.feels_like) + "°C";
        document.getElementById('clima-humedad').textContent = "Humedad: " + main.humidity + '%';
        document.getElementById('clima-name').textContent = name;
        document.getElementById('clima-desc').textContent = weather[0].description
    } catch {
        console.log("no se pudo obtener clima: ")
    }
}
obtenerClimaDia()

async function obtenerClima() {
    try {
        let respuesta = await fetch('http://api.openweathermap.org/data/2.5/forecast?lat=-24.182673866114143&lon=-65.33121206931652&appid=bf94524c67d2c84b740df27ed1f3674d&units=metric&lang=es')
        let climas = await respuesta.json();
        let lista = obtenerListaDatosDias(climas)
        let dias = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado']
        let i = 1;
        for (let index = 0; index < lista.length; index++) {
            for (const dia of lista) {
                document.getElementById(`dia-${i}-nombre`).textContent = dias[new Date(dia.dt_txt).getDay()];
                document.getElementById(`dia-${i}-img`).src = 'http://openweathermap.org/img/wn/' + dia.weather[0].icon + '@2x.png';
                document.getElementById(`dia-${i}-temp`).textContent = Math.round(dia.main.temp) + '°C'
                document.getElementById(`dia-${i}-descrip`).textContent = dia.weather[0].description;
                i += 1;
            }
        }
    } catch {
        console.log("no se pudo obtener clima")
    }
}
obtenerClima()

function obtenerListaDatosDias(climas) {
    let lista = [];
    for (let index = 0; index < climas.list.length; index++) {
        let hora = new Date(climas.list[index].dt_txt).getHours()
        if (hora == 15) {
            lista.push(climas.list[index])
        }
    }
    return lista;
}
