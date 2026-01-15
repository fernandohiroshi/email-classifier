"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { processText, processFile } from "@/lib/api";
import { ProcessResponse } from "@/types";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

interface UploadFormProps {
  onSuccess: (result: ProcessResponse) => void;
}

export default function UploadForm({ onSuccess }: UploadFormProps) {
  const [senderEmail, setSenderEmail] = useState("");
  const [textInput, setTextInput] = useState("");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTextSubmit = async () => {
    if (!textInput.trim()) {
      setError("Texto do email é obrigatório.");
      return;
    }

    if (!senderEmail.trim()) {
      setError("Email do remetente é obrigatório.");
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      const result = await processText(textInput, senderEmail);
      onSuccess(result);
      setTextInput("");
    } catch (err) {
      setError("Erro ao processar texto. Tente novamente.");
      console.error(err);
    } finally {
      setProcessing(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!senderEmail.trim()) {
      setError("Email do remetente é obrigatório.");
      e.target.value = "";
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      const result = await processFile(file, senderEmail);
      onSuccess(result);
    } catch (err) {
      setError("Erro ao processar arquivo. Verifique o formato.");
      console.error(err);
    } finally {
      setProcessing(false);
      e.target.value = "";
    }
  };

  return (
    <div className="bg-card rounded-xl shadow-sm border border-border p-4 sm:p-6 lg:p-8">
      {error && (
        <div className="mb-4 p-4 bg-destructive/10 border border-destructive/50 rounded-lg text-destructive">
          {error}
        </div>
      )}

      <div className="mb-6">
        <label className="text-sm font-medium text-foreground mb-2 block">
          Email do remetente
        </label>
        <Input
          type="email"
          value={senderEmail}
          onChange={(e) => setSenderEmail(e.target.value)}
          disabled={processing}
          placeholder="ex: cliente@empresa.com"
        />
      </div>

      <div className="mb-4">
        <span className="text-sm font-medium text-foreground mb-2 block">
          Upload de Arquivo
        </span>
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="relative"
            disabled={processing || !senderEmail.trim()}
            onClick={() => {
              if (!senderEmail.trim()) return;
              document.getElementById("file-input")?.click();
            }}
          >
            Escolher arquivo
          </Button>
          <span className="text-xs text-muted-foreground">
            Aceita arquivos <b>.txt</b> ou <b>.pdf</b> e upload apenas após
            informar o email do remetente
          </span>
        </div>
        <input
          id="file-input"
          type="file"
          accept=".txt,.pdf"
          onChange={handleFileUpload}
          disabled={processing || !senderEmail.trim()}
          className="hidden"
        />
      </div>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-card text-muted-foreground">ou</span>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-neutral-700 mb-2 block">
          Cole o Texto
        </label>
        <Textarea
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          disabled={processing}
          placeholder="Cole aqui o conteúdo do email..."
          className="h-48 resize-none"
        />
        <button
          onClick={handleTextSubmit}
          disabled={!textInput.trim() || processing}
          className="mt-4 w-full bg-neutral-900 text-white py-3 rounded-lg font-medium hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {processing ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Processando...
            </>
          ) : (
            <>
              <Mail size={20} />
              Classificar Email
            </>
          )}
        </button>
      </div>
    </div>
  );
}
