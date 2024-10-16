function getQueryParameter(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function goBack() {
    window.history.back();
}

document.addEventListener("DOMContentLoaded", () => {
    const burgerName = getQueryParameter("burger");
    
    const burgerData = {
        "Vacania Burger": {
            imageSpot: "images/vacania.png",
            image: "images/vacania1.png",
            title: "Vacania 'Fran Costello'",
            description: "200 gr. de carne de vaca, salsa Vacania, cheddar, queso gruyere, cebolla caramelizada y bacon."
        },
        "Castillo Encantado": {
            imageSpot: "images/castillo.png",
            image: "images/castillo1.png",
            title: "Castillo 'El Especial'",
            description: "200 gr. de carne premium, queso azul, rúcula, cebolla caramelizada y salsa especial."
        },
        "Foodbab": {
            imageSpot: "images/foodbar.png",
            image: "images/foodbab1.png",
            title: "Castillo 'El Especial'",
            description: "200 gr. de carne premium, queso azul, rúcula, cebolla caramelizada y salsa especial."
        },
        "El Rubio": {
            imageSpot: "images/RUBIO.png",
            image: "images/rubio1.png",
            title: "Castillo 'El Especial'",
            description: "200 gr. de carne premium, queso azul, rúcula, cebolla caramelizada y salsa especial."
        },
        "Monty Burger": {
            imageSpot: "images/monty.png",
            image: "images/monty1.png",
            title: "Castillo 'El Especial'",
            description: "200 gr. de carne premium, queso azul, rúcula, cebolla caramelizada y salsa especial."
        },
        "MKT": {
            imageSpot: "images/mkt.png",
            image: "images/m.png",
            title: "Castillo 'El Especial'",
            description: "200 gr. de carne premium, queso azul, rúcula, cebolla caramelizada y salsa especial."
        },
        "Trafic Burger": {
            imageSpot: "images/trafic1.png",
            image: "images/traficburger.png",
            title: "Castillo 'El Especial'",
            description: "200 gr. de carne premium, queso azul, rúcula, cebolla caramelizada y salsa especial."
        },
        "D2 Street Bar": {
            imageSpot: "images/D2.png",
            image: "images/d21.png",
            title: "Castillo 'El Especial'",
            description: "200 gr. de carne premium, queso azul, rúcula, cebolla caramelizada y salsa especial."
        },
        "Blitz": {
            imageSpot: "images/Blitz.png",
            image: "images/blitz1.png",
            title: "Castillo 'El Especial'",
            description: "200 gr. de carne premium, queso azul, rúcula, cebolla caramelizada y salsa especial."
        },
        "La Boca Te Lía": {
            imageSpot: "images/boca.png",
            image: "images/boca1.png",
            title: "Castillo 'El Especial'",
            description: "200 gr. de carne premium, queso azul, rúcula, cebolla caramelizada y salsa especial."
        },
        "La Higuerica": {
            imageSpot: "images/higuerica.png",
            image: "images/higue1.png",
            title: "Castillo 'El Especial'",
            description: "200 gr. de carne premium, queso azul, rúcula, cebolla caramelizada y salsa especial."
        },
        "Jangueo": {
            imageSpot: "images/jangueo.png",
            image: "images/jangueo1.png",
            title: "Castillo 'El Especial'",
            description: "200 gr. de carne premium, queso azul, rúcula, cebolla caramelizada y salsa especial."
        },
        "Las Cenas de Hidalgo": {
            imageSpot: "images/cenas.png",
            image: "images/hidalgo1.png",
            title: "Castillo 'El Especial'",
            description: "200 gr. de carne premium, queso azul, rúcula, cebolla caramelizada y salsa especial."
        }
        // Añade más hamburgueserías y sus detalles aquí
    };

    if (burgerData[burgerName]) {
        document.getElementById("burger-spot").src = burgerData[burgerName].imageSpot;
        document.getElementById("burger-image").src = burgerData[burgerName].image;
    }
});


async function haVotado(idMovil) {
    const response = await fetch("https://theburgerweek-votos-default-rtdb.europe-west1.firebasedatabase.app/Votaciones.json");

    if (response.ok) {
        const data = await response.json();
        return Object.values(data || {}).some(votacion => votacion.idMovil === idMovil);
    }

    throw new Error("Error al verificar votación.");
}

async function guardarVotacion(email, hamburgueseria, idDispositivo) {
    const votacion = {
        CorreoElectronico: email,
        Hamburguesería: hamburgueseria,
        idMovil: idDispositivo,
        fecha: new Date().toISOString()
    };

    const response = await fetch("https://theburgerweek-votos-default-rtdb.europe-west1.firebasedatabase.app/Votaciones.json", {
        method: "POST",
        body: JSON.stringify(votacion),
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error("Error al guardar la votación.");
    }
}

function obtenerIdDispositivo() {
    const deviceInfo = [
        navigator.userAgent,
        screen.width,
        screen.height,
        new Date().getTime()
    ].join('-');
    
    return btoa(deviceInfo); // Codifica en base64 para un formato legible
}

function esCorreoValido(correo) {
    if (!correo) {
        return false; // Verifica si el correo está vacío o es nulo
    }

    // Expresión regular para validar el formato de un correo electrónico
    const regex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    return regex.test(correo); // Usa test para comprobar si el correo coincide con la regex
}

async function votar() {
    console.log("1");
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const now = new Date();

    const inicioVotacion = new Date(2024, 9, 17, 19, 0, 0);  // Meses en JS van de 0 a 11
    const finVotacion = new Date(2024, 9, 20, 17, 0, 0);

    // Verificar conectividad
    if (!navigator.onLine) {
        alert("No tienes conexión a Internet.");
        return;
    }

    // Validar fechas
    //if (now < inicioVotacion) {
      //  alert("La votación comienza el 17-10-2024 a las 19:00h.");
        //return;
    //}

    //if (now > finVotacion) {
      //  alert("La votación terminó el 20-10-2024 a las 17:00h.");
       // return;
    //}

    // Mostrar overlay de carga
    //document.getElementById("loadingOverlay").classList.remove("hidden");

    const yahaVotado = await haVotado(obtenerIdDispositivo());
        
        if (!yahaVotado) {
            const confirmar = confirm("ASEGÚRATE DE PROBAR TODAS LAS HAMBURGUESAS. \nSolo podrás votar una vez.");
            if (confirmar && name) {
                if (esCorreoValido(email)){
                await guardarVotacion(email, getQueryParameter("burger"), obtenerIdDispositivo());
                alert("Gracias, tu votación ha sido registrada.");
                window.location.href = "landing.html";  // Redirigir
                }
                else{
                    alert("Formato de correo incorrecto.");
                }
            }
        } else {
            alert("Ya has votado una vez.");
        }
    
}


document.getElementById("btnVotar").addEventListener("click", votar);