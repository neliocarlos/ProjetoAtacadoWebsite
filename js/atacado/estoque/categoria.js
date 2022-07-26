$(document).ready(function(){
    CarregarCategorias();

    $('#btnInclusao').click(function(){
        localStorage.setItem('opercat', '1');
        window.location = 'admincategorias.html';
    })
});

function CarregarCategorias(){
    var urlServico = 'https://localhost:7171/api/estoque/Categoria';
    $.get(urlServico, function(retorno, status){
        if (retorno.length == 0) {
            alert("Erro ao obter os dados.");
            return;
        }
        else {
            for (var i = 0; i < retorno.length; i++) {
                var cat = retorno[i];
                var alterar = '<td><button id="btnAlteracao" class="btn-warning" onclick="AcionarAlteracao(' + cat.codigo + ');">Alterar</button></td>';
                var excluir = '<td><button id="btnExclusao" class="btn-danger" onclick="AcionarExclusao(' + cat.codigo + ');">Excluir</button></td>';
                var situacao;
                if (cat.situacao == true){
                    situacao = "Ativo";
                }
                else {
                    situacao = "Inativo";
                }

                $('#tblCat tbody').append('<tr><td>' + cat.codigo + '</td><td>' + cat.descricao + '</td><td>' + situacao + '</td>' + alterar + excluir + '</tr>');
            }
        }
    });
}

function AcionarAlteracao(id){
    localStorage.setItem('opercat', '2');
    localStorage.setItem('opercatid', id);
    window.location = 'admincategorias.html';
}

function AcionarExclusao(id){
    localStorage.setItem('opercat', '3');
    localStorage.setItem('opercatid', id);
    window.location = 'admincategorias.html';
}