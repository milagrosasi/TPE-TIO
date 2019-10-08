"use strict";
document.addEventListener("DOMContentLoaded", function() {
    let botones = document.querySelectorAll(".vermas");
    botones.forEach(boton => {
      boton.addEventListener("click", verMasInfo);
    });
    function verMasInfo(){
      this.nextElementSibling.classList.toggle("oculto");
    }
  })