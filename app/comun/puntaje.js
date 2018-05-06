export function PuntajePartido(apuesta, resultado, reglas) {
  let puntajeTotalPartido = 0;
  console.log("ENTRADIIIDSS");
  console.log(apuesta.golesA);
  console.log(apuesta.golesB);
  console.log(resultado.golesB);
  console.log("REGLASXXX");
  console.log(reglas);
  if (typeof reglas[0] !== "undefined") {
    // Acertar el Ganador
    if (apuesta.golesA > apuesta.golesB && resultado.golesA > resultado.golesB)
      puntajeTotalPartido += reglas[0].value;
    if (apuesta.golesA < apuesta.golesB && resultado.golesA < resultado.golesB)
      puntajeTotalPartido += reglas[3].value;

    // Acertar el Empate
    if (
      apuesta.golesA === apuesta.golesB &&
      resultado.golesA === resultado.golesB
    )
      puntajeTotalPartido += reglas[2].value;

    // Acertar Diferencia de Goles
    if (apuesta.golesA - apuesta.golesB === resultado.golesA - resultado.golesB)
      puntajeTotalPartido += reglas[0].value;

    // Acertar cada Marcador
    if (apuesta.golesA === resultado.golesA)
      puntajeTotalPartido += reglas[1].value;
    if (apuesta.golesB === resultado.golesB)
      puntajeTotalPartido += reglas[1].value;
    console.log("PUNTAJE PARTIDO");
    console.log(puntajeTotalPartido);
  }

  return puntajeTotalPartido;
}
