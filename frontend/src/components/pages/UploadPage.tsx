"use client";

import { useState } from "react";
import { toast } from "sonner";
import UploadForm from "../features/UploadForm";
import { Badge } from "../ui/badge";
import { ProcessResponse } from "@/types";

interface UploadPageProps {
  onEmailProcessed?: () => void;
}

export default function UploadPage({ onEmailProcessed }: UploadPageProps) {
  const [uploadResult, setUploadResult] = useState<ProcessResponse | null>(
    null
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
        Processar Email
      </h2>
      <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
        Envie um arquivo ou cole o texto do email para classificação
      </p>

      <div className="mb-6">
        <UploadForm
          onSuccess={(result) => {
            setUploadResult(result);
            onEmailProcessed?.();
          }}
        />
      </div>

      {uploadResult && (
        <div className="bg-card rounded-xl shadow-sm border border-border p-8">
          <h3 className="text-xl font-bold text-foreground mb-4">
            Resultado da Classificação
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">
                Categoria
              </span>
              <Badge
                variant={
                  uploadResult.category === "Produtivo"
                    ? "default"
                    : "destructive"
                }
              >
                {uploadResult.category}
              </Badge>
            </div>
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium text-muted-foreground">
                  Resposta Sugerida:
                </span>
                <button
                  type="button"
                  onClick={async () => {
                    const textToCopy = `${uploadResult.suggested_response} AutoU Digital`;
                    await navigator.clipboard.writeText(textToCopy);
                    toast("Resposta sugerida copiada.");
                  }}
                  className="text-xs text-muted-foreground hover:text-foreground underline-offset-2 hover:underline"
                >
                  Copiar texto
                </button>
              </div>
              <div className="mt-2 p-4 bg-muted rounded-lg text-foreground">
                <p className="whitespace-pre-wrap">
                  {uploadResult.suggested_response} <br />
                  <span className="font-semibold text-blue-700">
                    AutoU Digital
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
