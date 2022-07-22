$(document).ready(function(){
    AvaliarOperacao();

    $('#btnCancelar').click(function(){
        Cancelar();
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
            $('#txtId').prop('disabled', true);

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
    $('#txtId').prop('disabled', true);
    $('#txtDescricao').prop('readonly', true);
    $('#txtDescricao').prop('disabled', true);
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
    categoria.situacao = $("input[name='radSituacao']:checked").is(':checked') ? true : false;

    var urlServico = 'https://localhost:7171/api/estoque/Categoria';

    $.ajax({
        url: urlServico,
        type: 'post',
        dataType: 'json',
        data: JSON.stringify(categoria),
        contentType: 'application/json',
        success: function (data) {
            alert('Categoria adicionada com sucesso (ID: ' + data.codigo + ').');
            Cancelar(); 
        }
    });
}

function AcionarAlteracao(){
    var categoria = {
        codigo: 0,
        descricao: 'string',
        situacao: true
    };

    categoria.codigo = $('#txtId').val();
    categoria.descricao = $('#txtDescricao').val();
    categoria.situacao = $('#radTRUE').is(':checked') ? true : false;

    var urlServico = 'https://localhost:7171/api/estoque/Categoria';

    $.ajax({
        url: urlServico,
        type: 'put',
        dataType: 'json',
        data: JSON.stringify(categoria),
        contentType: 'application/json',
        success: function (data) {
            alert('Categoria alterada com sucesso (ID: ' + data.codigo + ').');
            Cancelar(); 
        }
    });
}

function AcionarExclusao(){

    var id = localStorage.getItem('opercatid');
    var urlServico = 'https://localhost:7171/api/estoque/Categoria/' + id;

    $.ajax({
        url: urlServico,
        type: 'delete',
        dataType: null,
        data: null,
        contentType: 'application/json',
        success: function (data) {
            alert('Categoria excluída com sucesso (ID: ' + data.codigo + ').');
            Cancelar(); 
        }
    });
}

// O botão confirmar foi declarado na página HTML
function Confirmar(){
    var operacao = localStorage.getItem('opercat');
    if (operacao == 1) {
        AcionarInclusao();
    }
    else if (operacao == 2) {
        AcionarAlteracao();
    }
    else if (operacao == 3) {
        AcionarExclusao();
    }
}

function Cancelar(){
    var operacao = localStorage.getItem('opercat');
        if ((operacao == 2) || (operacao == 3)){
            localStorage.removeItem('opercatid');
        }
        localStorage.removeItem('opercat');
        window.location = 'categorias.html';
}

