import { importPKCS8, SignJWT } from "jose";

import { config } from "./config";

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const SCOPE = "https://www.googleapis.com/auth/spreadsheets";

type TokenCacheado = { token: string; venceEn: number };

let cache: TokenCacheado | null = null;

/**
 * Obtiene un access token de Google usando el flujo de cuenta de servicio
 * (JWT firmado con la private key -> intercambio por access token).
 * El token se cachea en memoria hasta 60 segundos antes de su vencimiento.
 */
export async function obtenerAccessToken(): Promise<string> {
  const ahora = Math.floor(Date.now() / 1000);

  if (cache && cache.venceEn - 60 > ahora) {
    return cache.token;
  }

  if (!config.google.email || !config.google.privateKey) {
    throw new Error(
      "Faltan las credenciales de Google (GOOGLE_SERVICE_ACCOUNT_EMAIL / GOOGLE_PRIVATE_KEY).",
    );
  }

  let clave;
  try {
    clave = await importPKCS8(config.google.privateKey, "RS256");
  } catch {
    throw new Error(
      "GOOGLE_PRIVATE_KEY tiene un formato inválido. Copiá la clave completa, incluyendo " +
        "-----BEGIN PRIVATE KEY----- y -----END PRIVATE KEY-----.",
    );
  }

  const assertion = await new SignJWT({ scope: SCOPE })
    .setProtectedHeader({ alg: "RS256", typ: "JWT" })
    .setIssuer(config.google.email)
    .setAudience(TOKEN_URL)
    .setIssuedAt(ahora)
    .setExpirationTime(ahora + 3600)
    .sign(clave);

  const respuesta = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
    cache: "no-store",
  });

  if (!respuesta.ok) {
    const detalle = await respuesta.text();
    throw new Error(`Google rechazó las credenciales (${respuesta.status}): ${detalle}`);
  }

  const datos = (await respuesta.json()) as { access_token: string; expires_in: number };
  cache = { token: datos.access_token, venceEn: ahora + datos.expires_in };
  return datos.access_token;
}
