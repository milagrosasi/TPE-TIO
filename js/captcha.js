"use strict"

let a = Math.floor(Math.random() * 9) + '';
let b = Math.floor(Math.random() * 9) + '';
let c = Math.floor(Math.random() * 9) + '';
let d = Math.floor(Math.random() * 9) + '';
let e = Math.floor(Math.random() * 9) + '';

let code = a + b + c + d + e;
document.getElementById("txtCaptcha").value = code;
document.getElementById("CaptchaDiv").innerHTML = code;


function checkform(theform) {
    let why = "";

    if (theform.CaptchaInput.value == "") {
      why += "- Por Favor ingrese CAPTCHA.\n";
    }
    if (theform.CaptchaInput.value != "") {
      if (ValidCaptcha(theform.CaptchaInput.value) == false) {
        why += "- El CAPTCHA Ingresado NO Es Correcto\n";
      }
    }
    if (why != "") {
      alert(why);
      return false;
    }
  }

 

  // Validar Numero Ingresado Contra el Numero Generado
  function ValidCaptcha() {
    let str1 = removeSpaces(document.getElementById('txtCaptcha').value);
    let str2 = removeSpaces(document.getElementById('CaptchaInput').value);
    if (str1 == str2) {
      return true;
    } else {
      return false;
    }
  }

  // Eliminar los espacios del código introducido y generado.
  function removeSpaces(string) {
    return string.split(' ').join('');
  }