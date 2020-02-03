document.getElementById("formulario").addEventListener("submit", cadastroLivro);

function cadastroLivro(e){
    e.preventDefault();
    var nome = document.getElementById("nome").value;
    var editora = document.getElementById("editora").value;
    var preco = document.getElementById("preco").value;
    var data = new Date();

    if(!nome || !editora || !preco){
        alert("Preencha os campos em branco");
        return false;
    }

    livro = {
        nome: nome,
        editora: editora,
        preco: preco,
        dia: data.getDate(),
        mes: data.getMonth(),
        ano: data.getFullYear()
    }
    

    if(localStorage.getItem("key") === null){
        var livros = [];
        livros.push(livro);
        localStorage.setItem("key", JSON.stringify(livros));
    }
    else{
        var livros = JSON.parse(localStorage.getItem("key"));
        livros.push(livro);
        localStorage.setItem("key", JSON.stringify(livros));
    }

    document.getElementById("formulario").reset();
    mostraKey();
}

function apagarLivro(editora){
    var livros = JSON.parse(localStorage.getItem("key"));

    for(var i=0; i < livros.length; i++){
        if(livros[i].editora == editora){
            livros.splice(i, 1);
        }

        localStorage.setItem("key", JSON.stringify(livros));
    }

    mostraKey();
}

function mostraKey(){
    var livros = JSON.parse(localStorage.getItem("key"));
    var livroResultado = document.getElementById("resultados");

    livroResultado.innerHTML = "";

    for(var i=0; i < livros.length; i++){
        var nome = livros[i].nome;
        var editora = livros[i].editora;
        var preco = livros[i].preco;
        var dia = livros[i].dia;
        var mes = livros[i].mes + 1;
        var ano = livros[i].ano;

        livroResultado.innerHTML += "<tr><td>" + nome + "</td><td>" + editora + "</td><td>" +"R$" + preco + 
        "</td><td>" + dia + "/" + mes + "/" + ano + '</td><td><button class="btn btn-danger" onclick="apagarLivro(\''+ editora +'\')">Excluir</button></td>' + "</td></tr>";   
    }
}