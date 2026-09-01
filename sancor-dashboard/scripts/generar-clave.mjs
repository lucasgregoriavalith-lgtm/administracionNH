#!/usr/bin/env node
/**
 * Genera el hash de una contraseña para pegar en la columna PASSWORD_HASH
 * de la hoja USUARIOS.
 *
 *   npm run clave -- "MiContraseñaSegura"
 */
import bcrypt from "bcryptjs";

const password = process.argv[2];

if (!password) {
  console.error('Uso: npm run clave -- "TuContraseña"');
  process.exit(1);
}

if (password.length < 8) {
  console.error("La contraseña tiene que tener al menos 8 caracteres.");
  process.exit(1);
}

console.log(bcrypt.hashSync(password, 10));
