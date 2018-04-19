function PuntajePartido(apuesta, resultado, reglas) {
  let puntajeTotalPartido = 0;

  // Acertar el Ganador
  if (apuesta[1] > apuesta[2] && resultado[1] > resultado[2]) puntajeTotalPartido += reglas[0];
  if (apuesta[1] < apuesta[2] && resultado[1] < resultado[2]) puntajeTotalPartido += reglas[0];

  // Acertar el Empate
  if (apuesta[1] === apuesta[2] && resultado[1] === resultado[2]) puntajeTotalPartido += reglas[1];

  // Acertar Diferencia de Goles
  if (apuesta[1] - apuesta[2] === resultado[1] - resultado[2]) puntajeTotalPartido += reglas[2];

  // Acertar cada Marcador
  if (apuesta[1] === resultado[1]) puntajeTotalPartido += reglas[3];
  if (apuesta[2] === resultado[2]) puntajeTotalPartido += reglas[3];

  return puntajeTotalPartido;
}

export function PuntajeJugador(apuestas, resultados, reglas) {
  let puntajeTotalJugador = 0;
  apuestas.forEach((element) => {
    puntajeTotalJugador += PuntajePartido(element, resultados[element[0]], reglas);
  });

  return puntajeTotalJugador;
}
