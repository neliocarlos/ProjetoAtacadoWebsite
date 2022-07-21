$(document).ready(function(){
    AvaliarOperacao();

    $('#btnCancelar').click(function(){
        var operacao = localStorage.getItem('opercat');
        if ((operacao == 2) || (operacao == 3)){
            localStorage.removeItem('opercatid');
        }
        localStorage.removeItem('opercat');
        window.location = 'categorias.html';
    });
});

function AvaliarOperacao(){
    var operacao = localStorage.getItem('opercat');
    if (operacao == 1) {
        $('#lblOperacao').text('Inclusão');
    }
    else if (operacao == 2) {
        $('#lblOperacao').text('Alteração');
        var id = localStorage.getItem('opercatid');
        CarregarCategoria(id);
    }
    else if (operacao == 3) {
        $('#lblOperacao').text('Exclusão');
        var id = localStorage.getItem('opercatid');
        CarregarCategoria(id);
        PrepararExclusao();
    }
    else {
        alert('Operação inválida!');
    }
}

function CarregarCategoria(id){
    var urlServico = 'https://localhost:7171/api/estoque/Categoria/' + id;
    $.get(urlServico, function(retorno, status){
        if (retorno == ''){
            alert('Categoria informada não existe (ID: ' + id + ').');
            return;
        }
        else {
            $('#txtId').val(retorno.codigo);
            $('#txtId').prop('readonly', true);

            $('#txtDescricao').val(retorno.descricao);
            
            if (retorno.situacao == true){
                $('#radTrue').prop('checked', true);
            }
            else {
                $('#radFalse').val('checked', true);
            }
        }
    });
}

function PrepararExclusao(){
    $('#txtId').prop('readonly', true);
    $('#txtDescricao').prop('readonly', true);
    $('#radTrue').prop('disabled', true);
    $('#radFalse').prop('disabled', true);
}

function AcionarInclusao(){
    var categoria = {
        codigo: 0,
        descricao: 'string',
        situacao: true
    };

    categoria.descricao = $('#txtDescricao').val();
    if ($('#radTrue').val(true)){
        categoria.situacao = true;
    }
    else {
        categoria.situacao = false;
    }

    var urlServico = 'https://localhost:7171/api/estoque/Categoria';
    $.post(urlServico, categoria, function(retorno, status){
        if (retorno == ''){
            alert('Ocorreu um erro ao executar a inclusão.');
        }
        else if (retorno.codigo != 0) {
            alert('Categoria adicionada com sucesso (ID: ' + retorno.codigo + ').');
        }
    });
}

function Confirmar(){
    var operacao = localStorage.getItem('opercat');
    if (operacao == 1) {
        AcionarInclusao();
    }
    else if (operacao == 2) {
        
    }
    else if (operacao == 3) {

    }
}