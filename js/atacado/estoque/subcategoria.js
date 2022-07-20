$(document).ready(function(){
    CarregarCategorias();

    $('#ddlCat').change(function(){
        $('#tblSubcat tbody').empty();
        var idcat = $('#ddlCat option:selected').val();
        CarregarSubcategorias(idcat);
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
                $('#ddlCat').append('<option value="' + cat.codigo + '">' + cat.descricao + '</option>');
            }
        }
    });
}

function CarregarSubcategorias(idcat){
    var urlServico = 'https://localhost:7171/api/estoque/Subcategoria/IdCategoria/' + idcat;
    $.get(urlServico, function(retorno, status){
        if (retorno.length == 0) {
            alert("Erro ao obter os dados.");
            return;
        }
        else {
            for (var i = 0; i < retorno.length; i++) {
                var sub = retorno[i];
                $('#tblSubcat tbody').append('<tr><td>' + sub.idSubcategoria + '</td><td>' + sub.descricaoSubcategoria+ '</td><td>' + sub.situacao + '</td></tr>');
            }
        }
    });
}
