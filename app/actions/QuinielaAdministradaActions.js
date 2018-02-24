import {
  QUINIELA_ADMINISTRADA_UPDATE,
  ESCONDER_MENU_QUINIELA_ADMIN,
  MOSTRAR_MENU_QUINIELA_ADMIN,
} from './types';

export const QuinielaAdministradaUpdate = ({ prop, value }) => ({
  type: QUINIELA_ADMINISTRADA_UPDATE,
  payload: { prop, value },
});

export const mostrarMenu = () => ({
  type: MOSTRAR_MENU_QUINIELA_ADMIN,
});
export const esconderMenu = () => ({
  type: ESCONDER_MENU_QUINIELA_ADMIN,
});
