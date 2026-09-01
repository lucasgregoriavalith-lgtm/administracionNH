import { NextResponse, type NextRequest } from "next/server";

const COOKIE_SESION = "sancor_sesion";

const PUBLICAS = ["/login", "/api/auth/login", "/api/auth/logout"];

/**
 * Chequeo rápido y optimista: si no hay cookie de sesión, ni siquiera llegamos a la página.
 * La verificación real de la firma del token la hace el servidor en cada pantalla
 * (src/app/(app)/layout.tsx) y en cada endpoint de la API, así que una cookie
 * inventada no da acceso a ningún dato.
 */
export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (PUBLICAS.some((ruta) => pathname === ruta || pathname.startsWith(`${ruta}/`))) {
    return NextResponse.next();
  }

  if (request.cookies.get(COOKIE_SESION)?.value) return NextResponse.next();

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const destino = new URL("/login", request.url);
  if (pathname !== "/") destino.searchParams.set("volver", `${pathname}${search}`);
  return NextResponse.redirect(destino);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|ico|webp)$).*)"],
};
