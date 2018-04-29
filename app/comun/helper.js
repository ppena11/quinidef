export const defaultplaceholder = 'Correo electrónico...';
export const defaultplaceholderc = 'Contraseña...';
export const defaultplaceholdern = 'Nombre...';

export function manejarError(errorCode) {
  switch (errorCode) {
    case 'auth/user-disabled':
      return {
        placeholderc: defaultplaceholderc,
        password: '',
        email: '',
        authenticating: false,
        placeholder: defaultplaceholder,
        error: 'Correo electrónico deshabilitado',
      };
      break;
    case 'auth/invalid-email':
      return {
        placeholderc: defaultplaceholderc,
        password: '',
        email: '',
        authenticating: false,
        placeholder: defaultplaceholder,
        error: 'Correo electrónico inválido',
      };
      break;
    case 'auth/invalid-name':
      return {
        placeholdern: defaultplaceholdern,
        authenticating: false,
        error: 'Nombre inválido',
      };
      break;
    case 'auth/user-not-found':
      return {
        placeholderc: defaultplaceholderc,
        password: '',
        email: '',
        authenticating: false,
        placeholder: defaultplaceholder,
        error: 'Correo electrónico no registrado',
      };
      break;
    case 'auth/wrong-password':
      // this.inputCorreo.placeholder = emailAddress;
      return {
        placeholderc: defaultplaceholderc,
        password: '',
        authenticating: false,
        // placeholder: emailAddress,
        error: 'Contraseña incorrecta',
      };
      break;

    case 'auth/network-request-failed':
      // this.inputCorreo.placeholder = emailAddress;

      return {
        // placeholderc: password,
        authenticating: false,
        // placeholder: emailAddress,
        error: 'Problema de conexión a internet',
      };
      break;

    case 'auth/too-many-requests':
      // this.inputCorreo.placeholder = emailAddress;

      return {
        placeholderc: defaultplaceholderc,
        password: '',
        email: '',
        authenticating: false,
        placeholder: defaultplaceholder,
        error: 'Muchos intentos fallidos, intente luego',
      };
      break;

    case 'auth/email-already-in-use':
      return {
        placeholderc: defaultplaceholderc,
        password: '',
        email: '',
        authenticating: false,
        placeholder: defaultplaceholder,
        error: 'Correo electrónico ya registrado',
      };
      break;

    case 'auth/weak-password':
      return {
        placeholderc: defaultplaceholderc,
        password: '',
        authenticating: false,
        placeholder: defaultplaceholder,
        error: 'El password debe tener al menos 6 caracteres',
      };
      break;

    default:
      return {
        authenticating: false,
        error: errorCode,
      };
    // etc
  }
}

export function generarCodigo() {
  const caracteresPosibles = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
  ]; // Combinaciones posibles: 1.679.616
  let codigo;
  codigo = elementoAleatorio(caracteresPosibles);
  codigo += elementoAleatorio(caracteresPosibles);
  codigo += elementoAleatorio(caracteresPosibles);
  codigo += elementoAleatorio(caracteresPosibles);
  return codigo;
}

function elementoAleatorio(array) {
  const max = array.length;
  const valorAleatorio = Math.floor(Math.random() * max);
  return array[valorAleatorio];
}
