
export function pais3letras (paisTresLetras) {
  let indice = listaPaises3Letras.indexOf(paisTresLetras)
  return listaPaisesESP[indice];
}

const listaPaises3Letras = [
  "rus",
  "ksa",
  "egy",
  "uru",

  "esp",
  "por",
  "mar",
  "irn",

  "fra",
  "aus",
  "per",
  "den",

  "arg",
  "isl",
  "cro",
  "nga",

  "bra",
  "sui",
  "crc",
  "srb",

  "ger",
  "mex",
  "swe",
  "kor",

  "bel",
  "pan",
  "tun",
  "eng",

  "pol",
  "sen",
  "col",
  "jpn"
];

const listaPaisesESP = [
  "Rusia",
  "Arabia Saudita",
  "Egipto",
  "Uruguay",

  "España",
  "Portugal",
  "Marruecos",
  "Irán",

  "Francia",
  "Australia",
  "Perú",
  "Dinamarca",

  "Argentina",
  "Islandia",
  "Croacia",
  "Nigeria",

  "Brasil",
  "Suiza",
  "Costa Rica",
  "Serbia",

  "Alemania",
  "México",
  "Suecia",
  "Corea del Sur",

  "Bélgica",
  "Panamá",
  "Túnez",
  "Inglaterra",

  "Polonia",
  "Senegal",
  "Colombia",
  "Japón"
];