function abrirModalMomento(imgSrc, titulo, detalhe) {
    document.getElementById('modal-img').src = imgSrc;
    document.getElementById('modal-titulo').innerText = titulo;
    document.getElementById('modal-detalhe').innerText = detalhe;
    document.getElementById('modal-momento').style.display = 'flex';
}

function fecharModalMomento() {
    document.getElementById('modal-momento').style.display = 'none';
}

// Adiciona evento aos quadros de momento
document.querySelectorAll('.momento-mapa .quadro-momento').forEach((quadro) => {
    quadro.style.cursor = 'pointer';
    quadro.addEventListener('click', function () {
        const img = quadro.querySelector('img');
        const titulo = quadro.querySelector('.descricao')?.innerText || '';
        const detalhe = img.getAttribute('data-detalhe') || img.alt || '';
        abrirModalMomento(img.src, titulo, detalhe);
    });
});

// Chuva de corações
const coracoes = ['💖','💗','💓','💞','💘','❤️','💕'];
for (let i = 0; i < 18; i++) {
    const span = document.createElement('span');
    span.className = 'chuva-coracao';
    span.innerText = coracoes[Math.floor(Math.random() * coracoes.length)];
    span.style.left = `${Math.random() * 100}vw`;
    span.style.animationDuration = `${2.5 + Math.random() * 2.5}s`;
    span.style.animationDelay = `${Math.random() * 4}s`;
    document.querySelector('.chuva-coracoes').appendChild(span);
}

// Chuva de Hello Kitty/fotos
const kittyImgs = [
    "https://media.tenor.com/KCR6uHAlphkAAAAj/hello-kitty.gif",
    "https://i.pinimg.com/originals/87/d9/82/87d982b8a2bfbf7727fb944eb9216b4c.gif"
];
for (let i = 0; i < 8; i++) {
    const img = document.createElement('img');
    img.className = 'chuva-kitty-img';
    img.src = kittyImgs[i % kittyImgs.length];
    img.style.left = `${Math.random() * 100}vw`;
    img.style.animationDuration = `${3 + Math.random() * 3}s`;
    img.style.animationDelay = `${Math.random() * 4}s`;
    document.querySelector('.chuva-kitty').appendChild(img);
}

// Controle de áudio do vídeo de fundo
const bgVideo = document.getElementById('bg-audio-video');
const audioToggle = document.getElementById('audio-toggle');
let audioPausado = false;

audioToggle.onclick = function() {
    if (bgVideo.paused) {
        bgVideo.play();
        audioToggle.innerText = '⏸ Pausar música';
        audioPausado = false;
    } else {
        bgVideo.pause();
        audioToggle.innerText = '▶️ Tocar música';
        audioPausado = true;
    }
};