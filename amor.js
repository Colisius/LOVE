const coracoesContainer = document.getElementById('coracoes-container');
const carregando = document.getElementById('carregando-romantico');
const barra = carregando.querySelector('.barra');
let coracoesClicados = 0;
const totalCoracoes = 5;
let coracoes = [];
let intervalos = [];

function getRandomPosition() {
    const containerWidth = coracoesContainer.offsetWidth || 320;
    const containerHeight = coracoesContainer.offsetHeight || 180;
    const left = Math.random() * (containerWidth - 48);
    const top = Math.random() * (containerHeight - 48);
    return { left, top };
}

function criarCoracao(id) {
    const coracao = document.createElement('img');
    coracao.className = 'coracao-interativo';
    coracao.src = 'assets/coracao.png';
    coracao.alt = 'Coração';
    coracao.width = 48;
    coracao.height = 48;
    coracao.dataset.id = id;

    const { left, top } = getRandomPosition();
    coracao.style.left = `${left}px`;
    coracao.style.top = `${top}px`;

    coracao.onclick = function () {
        if (!coracao.classList.contains('sumido')) {
            coracao.classList.add('sumido');
            coracao.style.pointerEvents = 'none';
            coracoesClicados++;
            clearInterval(intervalos[id]);
            if (coracoesClicados === totalCoracoes) {
                mostrarCarregandoRomantico();
            }
        }
    };
    coracoesContainer.appendChild(coracao);
    coracoes[id] = coracao;

    // Faz o coração sumir e reaparecer a cada 3 segundos em nova posição
    intervalos[id] = setInterval(() => {
        if (!coracao.classList.contains('sumido')) {
            coracao.classList.add('sumido');
            setTimeout(() => {
                if (coracoesClicados < totalCoracoes) {
                    const { left, top } = getRandomPosition();
                    coracao.style.left = `${left}px`;
                    coracao.style.top = `${top}px`;
                    coracao.classList.remove('sumido');
                }
            }, 400);
        }
    }, 3000);
}

function mostrarCarregandoRomantico() {
    coracoes.forEach((c, i) => {
        c.remove();
        clearInterval(intervalos[i]);
    });
    carregando.style.display = 'block';
    setTimeout(() => {
        barra.style.width = '100%';
        barra.innerHTML = 'Carregando amor... <span class="cora">💖</span>';
    }, 100);

    setTimeout(() => {
        explosaoFinal();
    }, 3000); // 3 segundos de carregamento
}

function explosaoFinal() {
    // Explosão de corações!
    for (let i = 0; i < 60; i++) {
        const explodir = document.createElement('span');
        explodir.className = 'coracao-explosao';
        explodir.innerText = '💖';
        explodir.style.left = Math.random() * 100 + '%';
        explodir.style.top = Math.random() * 90 + '%';
        explodir.style.fontSize = (Math.random() * 2 + 2) + 'rem';
        explodir.style.position = 'fixed';
        explodir.style.opacity = 1;
        explodir.style.transition = 'all 1.2s cubic-bezier(.68,-0.55,.27,1.55)';
        explodir.style.zIndex = 9999;
        document.body.appendChild(explodir);
        setTimeout(() => {
            explodir.style.transform = `translate(${(Math.random() - 0.5) * 800}px, ${(Math.random() - 0.5) * 800}px) scale(0.2)`;
            explodir.style.opacity = 0;
        }, 50);
        setTimeout(() => {
            explodir.remove();
        }, 1300);
    }
    setTimeout(() => {
        window.location.href = "momentos.html";
    }, 1400);
}

function iniciar() {
    coracoesClicados = 0;
    coracoes = [];
    intervalos.forEach(clearInterval);
    intervalos = [];
    coracoesContainer.innerHTML = '';
    carregando.style.display = 'none';
    barra.style.width = '0';
    barra.innerHTML = '<span class="cora">💖</span>';
    for (let i = 0; i < totalCoracoes; i++) {
        criarCoracao(i);
    }
}

window.addEventListener('resize', iniciar);
iniciar();