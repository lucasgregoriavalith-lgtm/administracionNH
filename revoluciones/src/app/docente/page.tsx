import type { Metadata } from "next";
import { TeacherDashboard } from "@/components/progreso/TeacherDashboard";

export const metadata: Metadata = {
  title: "Panel del docente",
  description: "Resultados del grupo y diagnóstico de contenidos a retomar.",
  robots: { index: false, follow: false },
};

export default function PaginaDocente() {
  return <TeacherDashboard />;
}
