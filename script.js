const envoltura = document.querySelector(".envoltura-sobre");
const carta = document.querySelector(".carta");

// 1. Lógica original corregida para abrir/cerrar el sobre
document.addEventListener("click", (e) => {
    // Agregamos los puntos (.) que faltaban en las clases de las solapas
    if (e.target.matches(".sobre") ||
        e.target.matches(".solapa-derecha") || 
        e.target.matches(".solapa-izquierda") ||
        e.target.matches(".corazon")) {
        
        envoltura.classList.toggle("abierto");
        envoltura.classList.add("desactivar-sobre");

        if (!carta.classList.contains("abierta")) {
            setTimeout(() => {
                carta.classList.add("mostrar-carta");

                setTimeout(() => {
                    carta.classList.remove("mostrar-carta");
                    carta.classList.add("abierta");
                }, 500);
            }, 1000);
        }
    } else if (e.target.matches(".envoltura-sobre *")) {
        envoltura.classList.remove("abierto");
        envoltura.classList.remove("desactivar-sobre");
        if (carta.classList.contains("abierta")) {
            carta.classList.add("cerrando-carta");

            setTimeout(() => {
                carta.classList.remove("cerrando-carta");
                carta.classList.remove("abierta");
            }, 500);
        }
    }
});

// 2. Lógica para la lluvia de corazones explosivos
function crearCorazon() {
    const contenedor = document.getElementById('lluvia-corazones');
    if (!contenedor) return; // Seguridad por si el div no existe aún

    const corazon = document.createElement('div');
    corazon.classList.add('corazon-cayendo');
    corazon.innerHTML = '🩷'; 
    
    // Posición y estilo aleatorio
    corazon.style.left = Math.random() * 100 + "vw";
    const duracion = Math.random() * 3 + 3;
    corazon.style.animationDuration = duracion + "s";
    
    // Evento para EXPLOTAR al tocar o pasar el mouse
    const explotar = () => {
        corazon.innerHTML = '💥';
        corazon.style.animation = 'all'; // Detiene la caída
        setTimeout(() => corazon.remove(), 150);
    };

    corazon.addEventListener('mouseover', explotar);
    corazon.addEventListener('touchstart', explotar); // Para celulares

    contenedor.appendChild(corazon);

    // Limpieza automática
    setTimeout(() => {
        if(corazon.parentNode) corazon.remove();
    }, duracion * 1000);
}

// Iniciar la lluvia cada 400ms
setInterval(crearCorazon, 200);


