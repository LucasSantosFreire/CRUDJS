var selectedRow = null
FaturamentoAtual();
//função base para inserir dados no formulario
function onFormSubmit() {
    if (validate() && validateValue()) {
        var formData = readFormData();
        if (selectedRow == null){
            insertNewRecord(formData);
            FaturamentoAtual();
        }else{
            updateRecord(formData);
            FaturamentoAtual();
        }
        resetForm();
    }
}
//função que vai ler os dados do formulario e retornar uma var/array com todos os dados
function readFormData() {
    var formData = {};
    formData["nome"] = document.getElementById("nome").value;
    formData["devs"] = document.getElementById("devs").value;
    formData["tecs"] = document.getElementById("tecs").value;
    formData["days"] = document.getElementById("days").value;
    formData["valor"] = document.getElementById("valor").value;
    return formData;
}
//vai receber os dados do formulario e inserir uma nova linha na tabela
function insertNewRecord(data) {
    var table = document.getElementById("tabela").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.nome;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.devs;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.tecs;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.days;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = data.valor;
    cell6 = newRow.insertCell(5);
    cell6.innerHTML = `<a onClick="onEdit(this)">Edit</a> 
                       <a onClick="onDelete(this)">Delete</a>`; // aqui os botoes de editar e excluir chamando suas respectivas funções.
}
// o reset vai servir para zerar os valores do formulario.
function resetForm() {
    document.getElementById("nome").value = "";
    document.getElementById("devs").value = "";
    document.getElementById("tecs").value = "";
    document.getElementById("days").value = "";
    document.getElementById("valor").value = "";
    selectedRow = null;
}
//função do botao edit, vai trazer os valores da tabela pro formulario.
function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("nome").value = selectedRow.cells[0].innerHTML;
    document.getElementById("devs").value = selectedRow.cells[1].innerHTML;
    document.getElementById("tecs").value = selectedRow.cells[2].innerHTML;
    document.getElementById("days").value = selectedRow.cells[3].innerHTML;
    document.getElementById("valor").value = selectedRow.cells[4].innerHTML;
}
//o submit que vai suceder o onEdit, atualizando os dados na tabela.
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.nome;
    selectedRow.cells[1].innerHTML = formData.devs;
    selectedRow.cells[2].innerHTML = formData.tecs;
    selectedRow.cells[3].innerHTML = formData.days;
    selectedRow.cells[4].innerHTML = formData.valor;
    FaturamentoAtual();
}
//função do botao delete, apagando a linha desejada e resetando o formulario so por precaução.
function onDelete(td) {
    if (confirm('Tem certeza que deseja deletar?')) {
        row = td.parentElement.parentElement;
        document.getElementById("tabela").deleteRow(row.rowIndex);
        resetForm();
    }
    FaturamentoAtual();
}
//validação do nome do projeto, ele não pode estar vazio.
function validate() {
    isValid = true;
    if (document.getElementById("nome").value == "") {
        isValid = false;
        document.getElementById("nomeErro").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("nomeErro").classList.contains("hide"))
            document.getElementById("nomeErro").classList.add("hide");
    }
    return isValid;
}

function validateValue() {
    isValid = true;
    if (document.getElementById("valor").value == "" || document.getElementById("valor").value < 0) {
        isValid = false;
        document.getElementById("valorErro").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("valorErro").classList.contains("hide"))
            document.getElementById("valorErro").classList.add("hide");
    }
    return isValid;
}
// calcula o faturamento atual e a porcentagem atual em relação a meta, e a qtd de projetos rem relação a meta
function FaturamentoAtual(){
    var table = document.getElementById("tabela"), sumVal = 0;
            for(var i = 1; i < table.rows.length; i++)
            {
                sumVal = sumVal + parseFloat(table.rows[i].cells[4].innerHTML);
            }
            document.getElementById("faturamento").innerHTML = "R$ " + sumVal;
            document.getElementById("porc").innerHTML = ((sumVal/30000) * 100) + "%";
            document.getElementById("proj").innerHTML = `${i - 1}/ 15`;
            Farol(sumVal);
}

function Farol(valor){
    if((valor > 10000) && (valor < 20000)){
        document.getElementById("farolColor").classList.add("color2");
        document.getElementById("farolColor").classList.remove("color3");
    }else if(valor > 20000){
        document.getElementById("farolColor").classList.add("color3");
    }else{
        document.getElementById("farolColor").classList.remove("color3");
        document.getElementById("farolColor").classList.remove("color2");
    }
}