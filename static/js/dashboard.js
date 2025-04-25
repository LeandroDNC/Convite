function abrirCaixa() {
    alert("Caixa aberto com sucesso!");
}

function verRelatorio() {
    alert("Carregando relatório de vendas...");
}

const loginURL = "{{ url_for('login') }}";

function sair() {
    window.location.href = loginURL;
}

document.getElementById("botao-sair").addEventListener("click", sair);