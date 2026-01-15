import Link from "next/link";
import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-neutral-50 px-4">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900/5 text-neutral-900">
          <AlertTriangle className="h-6 w-6" />
        </div>
        <h1 className="mb-2 text-2xl font-bold text-neutral-900">
          Página não encontrada
        </h1>
        <p className="mb-6 text-sm text-neutral-600">
          A página que você tentou acessar não existe ou foi movida.
        </p>
        <Button asChild>
          <Link href="/">Voltar para o início</Link>
        </Button>
      </div>
    </main>
  );
}
