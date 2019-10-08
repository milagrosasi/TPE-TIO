"use strict"

let ventas3 = [
    {
        "thing": {
            "marca": "JEEP",
            "modelo": "2014",
            "combustible": "Nafta",
            "color": "Blanco",
            "precio": "$140.000"
        }
    },
    {
        "thing": {
            "marca": "Fiat Siena",
            "modelo": "2010",
            "combustible": "Nafta",
            "color": "Negro",
            "precio": "$190.000"
        }
    },
    {
        "thing": {
            "marca": "Renault Clio",
            "modelo": "2002",
            "combustible": "Nafta",
            "color": "Champang",
            "precio": "$100.000"
        }
    }
]

async function precargaGrilla(){
    let div = document.querySelector("#tabla");
    let url = "http://web-unicen.herokuapp.com/api/groups/57/serenidad";
        
    try {
        let r = await fetch(url);
        let json = await r.json();
        console.log(json);
        $("#tabla tbody tr").remove(); 
        for (let elem of json.serenidad) {
            let fila = `<tr id="`+elem._id+`">
                            <th scope="row">`+elem._id+`</th>
                            <td>` + elem.thing.marca + `</td>
                            <td>` + elem.thing.modelo + `</td>
                            <td>` + elem.thing.combustible + `</td>
                            <td>` + elem.thing.color + `</td>
                            <td>` + elem.thing.precio + `</td>
                            <td class="bt-icon" onclick="editar($(this).parent()); window.location='#datosAuto'"><i class="fas fa-pencil-alt"></i></td>
                            <td class="bt-icon" onclick="borrar($(this).parent());"><i class="far fa-trash-alt"></i></td></tr>`;
            $('#tabla').append(fila);
        }
    } catch(e) {
        console.log(e);
        div.innerHTML = "Fallo la Carga de Datos";
    }
    mostrarBoton(false); // Muestra Agregar y Oculta Guardar
}


let body = document.getElementsByTagName("tbody")[0];

body.addEventListener("load", precargaGrilla(), false);


$(document).ready(function(){
    $('#bt-add').click(function(){
        agregarUno();
    });
    $('#bt-add3').click(function(){
        agregar3();
    });
    $('#btn-guardar').click(function(){
        editarPut();
    }); 
    $('#bt-cancelar').click(function(){
        cancelar();
    });  
});

async function agregarUno(){
    if(validar()){
        let marca = document.getElementById("idmarca").value;
        let modelo = document.getElementById("idmodelo").value;
        let combustible = document.getElementById("idcombustible").value;
        let color = document.getElementById("idcolor").value;
        let precio = document.getElementById("idprecio").value;
        let venta = {
            "thing": {
                "marca": marca,
                "modelo": modelo,
                "combustible": combustible,
                "color": color,
                "precio": precio
            }
        }
        let url = "http://web-unicen.herokuapp.com/api/groups/57/serenidad"
        
        try {
            let r = await fetch(url, {
                "method": "POST",
                "headers": {
                    "content-type": "application/json"
                },
                "body": JSON.stringify(venta)
            });
            let json = await r.json();
            console.log(json);
            precargaGrilla();
            limpiarInputs();
        } catch(e) {
            div.innerHTML = "Fallo el Agregar";
        }
    }    
}

async function agregar3(){
    for (let i = 0; i<ventas3.length; i++){
        let url = "http://web-unicen.herokuapp.com/api/groups/57/serenidad"
    
        try {
            let r = await fetch(url, {
            "method": "POST",
            "headers": {
                "content-type": "application/json"
            },
            "body": JSON.stringify(ventas3[i])
        });
        let json = await r.json();
        console.log(json);
        precargaGrilla();
        } catch(e) {
            div.innerHTML = "Fallo el Agregar";
        }
    }
  
}

async function borrar(ideliminar){
    let div = document.querySelector(".resultado");
    let url = "http://web-unicen.herokuapp.com/api/groups/57/serenidad/" + ideliminar[0].id;
   
    try {
        let r = await fetch(url, {
            "method": "DELETE"
        });
        let json = await r.json();
        console.log(json);
        precargaGrilla();
        document.getElementById("filtro").value = "";
    } 
    catch(e) {
        div.innerHTML = "Fallo el Borrado";
    }
}

function Filtrar() {
    // Declare variables 
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("filtro");
    filter = input.value.toUpperCase();
    table = document.getElementById("tabla");
    tr = table.getElementsByTagName("tr");

// Recorre todas las filas de la tabla y oculta a quienes no coinciden con la consulta de búsqueda
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        } 
    }
}

function editar(filaEditar){
    console.log(filaEditar);
    let children = filaEditar[0].cells;
    document.getElementById("id").value = children[0].innerHTML;
    document.getElementById("idmarca").value = children[1].innerHTML;
    document.getElementById("idmodelo").value = children[2].innerHTML;
    document.getElementById("idcombustible").value = children[3].innerHTML;
    document.getElementById("idcolor").value = children[4].innerHTML;
    document.getElementById("idprecio").value = children[5].innerHTML;

    mostrarBoton(true); // Mostrar Guardar y Ocultar Agregar
}

function mostrarBoton(mostrar){
    if(mostrar){
        $('#btn-guardar').removeClass("btn-ocultar");
        $('#btn-guardar').addClass("btn btn-default");
        $('#bt-add').removeClass("btn btn-default");
        $('#bt-add').addClass("btn-ocultar");
    }
    else{
        $('#btn-guardar').removeClass("btn btn-default");
        $('#btn-guardar').addClass("btn-ocultar");
        $('#bt-add').removeClass("btn-ocultar");
        $('#bt-add').addClass("btn btn-default");
    }
}

async function editarPut(){
    if(validar()){
        let id = document.getElementById("id").value;
        let marca = document.getElementById("idmarca").value;
        let modelo = document.getElementById("idmodelo").value;
        let combustible = document.getElementById("idcombustible").value;
        let color = document.getElementById("idcolor").value;
        let precio = document.getElementById("idprecio").value;
        let venta = {
            "thing": {
                "marca": marca,
                "modelo": modelo,
                "combustible": combustible,
                "color": color,
                "precio": precio
            }
        }
        let url = "http://web-unicen.herokuapp.com/api/groups/57/serenidad"
        
        try {
            let r = await fetch(url + "/" + id, {
                "method": "PUT",
                "headers": {
                    "content-type": "application/json"
                },
                "body": JSON.stringify(venta)
            });
            let json = await r.json();
            console.log(json);
            precargaGrilla();
            limpiarInputs();
        } catch(e) {
            div.innerHTML = "Fallo el Guardado";
        }
    }
}

function limpiarInputs(){
    document.getElementById("idmarca").value = "";
    removeInvalid($('#idmarca'), document.getElementById("idmarca"));

    document.getElementById("idmodelo").value = "";
    removeInvalid($('#idmodelo'), document.getElementById("idmodelo"));

    document.getElementById("idcombustible").value = "";
    removeInvalid($('#idcombustible'), document.getElementById("idcombustible"));

    document.getElementById("idcolor").value = "";
    removeInvalid($('#idcolor'), document.getElementById("idcolor"));

    document.getElementById("idprecio").value = "";
    removeInvalid($('#idprecio'), document.getElementById("idprecio"));
}

function cancelar(){
    limpiarInputs();
    mostrarBoton(false); // Mostrar Agregar y Ocultar Guardar
}

function validar(){
    if( document.getElementById("idmarca").value && 
        document.getElementById("idmodelo").value &&
        document.getElementById("idcombustible").value &&
        document.getElementById("idcolor").value &&
        document.getElementById("idprecio").value){
        return true;
    }
    else{
        if(!document.getElementById("idmarca").value){
            setInvalid($('#idmarca'), document.getElementById("idmarca"));
        }
        else{
            removeInvalid($('#idmarca'), document.getElementById("idmarca"));
        }
        if(!document.getElementById("idmodelo").value){
            setInvalid($('#idmodelo'), document.getElementById("idmodelo"));
        }
        else{
            removeInvalid($('#idmodelo'), document.getElementById("idmodelo"));
        }
        if(!document.getElementById("idcombustible").value){
            setInvalid($('#idcombustible'), document.getElementById("idcombustible"));

        }
        else{
            removeInvalid($('#idcombustible'), document.getElementById("idcombustible"));

        }
        if(!document.getElementById("idcolor").value){
            setInvalid($('#idcolor'), document.getElementById("idcolor"));
        }
        else{
            removeInvalid($('#idcolor'), document.getElementById("idcolor"));

        }
        if(!document.getElementById("idprecio").value){
            setInvalid($('#idprecio'), document.getElementById("idprecio"));
        }
        else{
            removeInvalid($('#idprecio'), document.getElementById("idprecio"));

        }
    }
}

function setInvalid(invalidElem, placeholderElem){
    invalidElem.addClass('invalid');
    placeholderElem.placeholder = "Debe ingresar un valor";
}
function removeInvalid(invalidElem, placeholderElem){
    invalidElem.removeClass('invalid');
    placeholderElem.placeholder = "";
}