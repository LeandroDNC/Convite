function agendarZap() {
    const numero = '558184819184';
    const mensagem = encodeURIComponent("Olá! Gostaria de agendar um horário na Lobo Barbearia.");
    window.open(`https://wa.me/${numero}?text=${mensagem}`, '_blank');
}

function abrirInstagram() {
    window.open('https://www.instagram.com/seu_usuario_aqui', '_blank');
}
