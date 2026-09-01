import { redirect } from "next/navigation";

import { Shell } from "@/components/shell";
import { obtenerSesion } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function LayoutApp({ children }: { children: React.ReactNode }) {
  const sesion = await obtenerSesion();
  if (!sesion) redirect("/login");

  return <Shell sesion={sesion}>{children}</Shell>;
}
