"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-neutral-50 px-4">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
          <AlertCircle className="h-6 w-6" />
        </div>
        <h1 className="mb-2 text-2xl font-bold text-neutral-900">
          Algo deu errado
        </h1>
        <p className="mb-6 text-sm text-neutral-600">
          Ocorreu um erro inesperado ao carregar a aplicação. Você pode tentar
          novamente ou voltar para a página inicial.
        </p>
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-center">
          <Button variant="outline" onClick={reset}>
            Tentar novamente
          </Button>
          <Button asChild>
            <Link href="/">Ir para o início</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
