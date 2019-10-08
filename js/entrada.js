"use strict";

let btn = document.getElementById("btn-enviar")
let inputEmail = document.getElementById("input-email")
let inputConsulta = document.getElementById("input-consulta")

btn.addEventListener("click", function(e){
  verificarFormulario(inputEmail,inputConsulta)
} )

function verificarFormulario(email, consulta)
{  
  if(!emailValido(email.value))
  {
    alert('Debe ingresar un email valido');
    email.focus();
    return;
  }
}

function emailValido(email) {
  console.log(email)
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
