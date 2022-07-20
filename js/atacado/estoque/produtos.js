$(document).ready(function(){
    CarregarCategorias();

    $('#ddlCat').change(function(){
        $('#ddlSubcat').empty();
        $('#tblProduto tbody').empty();
        var idcat = $('#ddlCat option:selected').val();
        CarregarSubcategorias(idcat);
    })

    $('#ddlSubcat').change(function(){
        $('#tblProduto tbody').empty();
        var idsub = $('#ddlSubcat option:selected').val();
        CarregarProdutos(idsub);
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
                $('#ddlSubcat').append('<option value="' + sub.idSubcategoria + '">' + sub.descricaoSubcategoria + '</option>');
            }
        }
    });
}

function CarregarProdutos(idsub){
    var urlServico = 'https://localhost:7171/api/estoque/Produto/IdSubcategoria/' + idsub;
    $.get(urlServico, function(retorno, status){
        if (retorno.length == 0) {
            alert("Erro ao obter os dados.");
            return;
        }
        else {
            for (var i = 0; i < retorno.length; i++) {
                var prod = retorno[i];
                $('#tblProduto tbody').append('<tr><td>' + prod.idProduto + '</td><td>' + prod.descricaoProduto+ '</td><td>' + prod.situacao + '</td></tr>');
            }
        }
    });
}
