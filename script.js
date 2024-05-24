document.addEventListener('DOMContentLoaded', () => {
    const wordContainer = document.getElementById('wordContainer');
    const startButton = document.getElementById('startButton');
    const gameMessage = document.getElementById('gameMessage');
    const hintContainer = document.getElementById('hintContainer');
    const winMusic = document.getElementById('winMusic');
    const loseMusic = document.getElementById('loseMusic');
    const modeToggle = document.getElementById('toggleDarkMode');

    const palabras = [
        { palabra: 'javascript', pista: 'Lenguaje de programación' },
        { palabra: 'ahorcado', pista: 'Juego clásico de palabras' },
        { palabra: 'desarrollador', pista: 'Persona que escribe código' }
    ];

    let palabraSeleccionada, letrasAdivinadas, intentosIncorrectos;

    const partesAhorcado = [
        document.getElementById('hangmanHead'),
        document.getElementById('hangmanBody'),
        document.getElementById('hangmanLeftArm'),
        document.getElementById('hangmanRightArm'),
        document.getElementById('hangmanLeftLeg'),
        document.getElementById('hangmanRightLeg')
    ];

    function iniciarJuego() {
        const palabraAleatoria = palabras[Math.floor(Math.random() * palabras.length)];
        palabraSeleccionada = palabraAleatoria.palabra;
        letrasAdivinadas = [];
        intentosIncorrectos = 0;
        wordContainer.innerHTML = '';
        gameMessage.textContent = '';
        hintContainer.textContent = `Pista: ${palabraAleatoria.pista}`;
        partesAhorcado.forEach(parte => parte.style.display = 'none');

        for (let i = 0; i < palabraSeleccionada.length; i++) {
            const letraSpan = document.createElement('span');
            letraSpan.textContent = '_';
            letraSpan.classList.add('letter');
            wordContainer.appendChild(letraSpan);
        }
    }

    function actualizarContenedorPalabras() {
        const letras = wordContainer.querySelectorAll('.letter');
        for (let i = 0; i < palabraSeleccionada.length; i++) {
            if (letrasAdivinadas.includes(palabraSeleccionada[i])) {
                letras[i].textContent = palabraSeleccionada[i];
            }
        }
    }

    function verificarEstadoDelJuego() {
        const letras = wordContainer.querySelectorAll('.letter');
        const palabraAdivinada = Array.from(letras).every(letra => letra.textContent !== '_');
        if (palabraAdivinada) {
            gameMessage.textContent = '¡Ganaste!';
            winMusic.play();
        } else if (intentosIncorrectos >= partesAhorcado.length) {
            gameMessage.textContent = `¡Perdiste! La palabra era "${palabraSeleccionada}".`;
            loseMusic.play();
        }
    }

    function manejarEntradaDeLetras(event) {
        const letra = event.key.toLowerCase();
        if (palabraSeleccionada.includes(letra)) {
            letrasAdivinadas.push(letra);
            actualizarContenedorPalabras();
        } else {
            partesAhorcado[intentosIncorrectos].style.display = 'block';
            intentosIncorrectos++;
        }
        verificarEstadoDelJuego();
    }

    startButton.addEventListener('click', iniciarJuego);
    document.addEventListener('keydown', manejarEntradaDeLetras);

    modeToggle.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');
        partesAhorcado.forEach(parte => parte.classList.toggle('dark'));
    });
});
