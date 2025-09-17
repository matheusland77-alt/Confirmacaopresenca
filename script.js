// Captura os elementos do formulário
const botao = document.getElementById('btnConfirmar');
const processando = document.getElementById("processando");
const nomeInput = document.getElementById("nome");
const quantidadeInput = document.getElementById("quantidade");
const observacoesInput = document.getElementById("observacoes");

if (botao) {
    botao.addEventListener("click", function(event) {
        event.preventDefault(); // Evita que a página recarregue

        // Validação dos campos
        if (nomeInput.value.trim() === "") {
            alert('Por favor, digite seu nome.');
            nomeInput.focus();
            return;
        }

        if (quantidadeInput.value < 1) {
            alert("Por favor, informe a quantidade de participantes.");
            quantidadeInput.focus();
            return;
        }

        // Esconde o botão e mostra o loader
        botao.style.display = "none";
        processando.style.display = "block";

        // Monta os dados para envio
        const dados = {
            data: [
                {
                    Nome: nomeInput.value,
                    Quantidade: Number(quantidadeInput.value),
                    Observacoes: observacoesInput.value
                }
            ]
        };

        // Envia os dados para o SheetDB
        fetch('https://sheetdb.io/api/v1/st403yw4r0pti', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Sucesso:', data); // Apenas para debug
            // Redireciona para página de confirmação
            window.location.href = 'confirmado.html';
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Ocorreu um erro ao confirmar presença.');
            botao.style.display = "block";
            processando.style.display = "none";
        });
    });
}