export function PuntajePartido(apuesta, resultado, reglas) {
  let puntajeTotalPartido = 0;
  //console.log("ENTRADIIIDSS");
  //console.log(apuesta.golesA);
  //console.log(apuesta.golesB);
  //console.log(resultado.golesB);
  //console.log("REGLASXXX");
  //console.log(reglas);

  if (typeof reglas[1] !== "undefined") {
    //console.log(reglas["1"]);
    //console.log(reglas[1]);
    // Acertar el Ganador
    if (apuesta.golesA > apuesta.golesB && resultado.golesA > resultado.golesB)
      puntajeTotalPartido += reglas["1"].puntos;
    if (apuesta.golesA < apuesta.golesB && resultado.golesA < resultado.golesB)
      puntajeTotalPartido += reglas["1"].puntos;

    // Acertar el Empate
    if (
      apuesta.golesA === apuesta.golesB &&
      resultado.golesA === resultado.golesB
    )
      puntajeTotalPartido += reglas["2"].puntos;

    // Acertar Diferencia de Goles
    if (apuesta.golesA - apuesta.golesB === resultado.golesA - resultado.golesB)
      puntajeTotalPartido += reglas["3"].puntos;

    // Acertar cada Marcador
    if (apuesta.golesA === resultado.golesA)
      puntajeTotalPartido += reglas["4"].puntos;
    if (apuesta.golesB === resultado.golesB)
      puntajeTotalPartido += reglas["4"].puntos;
    //console.log("PUNTAJE PARTIDO");
    //console.log(puntajeTotalPartido);
  }

  return puntajeTotalPartido;
}
