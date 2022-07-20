$(document).ready(function(){
    CarregarCategorias();
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
                $('#tblCat tbody').append('<tr><td>' + cat.codigo + '</td><td>' + cat.descricao + '</td></tr>');
            }
        }
    });
}