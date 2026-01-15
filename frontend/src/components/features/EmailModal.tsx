"use client";

import { Calendar } from "lucide-react";
import { toast } from "sonner";
import { Email } from "@/types";
import { formatDate } from "@/lib/utils";
import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";

interface EmailModalProps {
  email: Email | null;
  onClose: () => void;
}

export default function EmailModal({ email, onClose }: EmailModalProps) {
  return (
    <Dialog open={!!email} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-auto">
        {email && (
          <>
            <DialogHeader className="space-y-1">
              <DialogTitle className="text-xl font-bold text-foreground">
                {email.subject}
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                {email.sender}
              </DialogDescription>
            </DialogHeader>

            <div className="mt-4 space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Calendar size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {formatDate(email.date)}
                  </span>
                  <Badge
                    className="ml-auto"
                    variant={
                      email.category === "Produtivo" ? "default" : "secondary"
                    }
                  >
                    {email.category}
                  </Badge>
                </div>

                <div className="bg-muted rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-foreground mb-2">
                    Conteúdo:
                  </h4>
                  <p className="text-foreground whitespace-pre-wrap">
                    {email.content}
                  </p>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h4 className="text-sm font-semibold text-foreground">
                    Resposta Sugerida:
                  </h4>
                  <button
                    type="button"
                    onClick={async () => {
                      const textToCopy = `${email.suggested_response} AutoU Digital`;
                      await navigator.clipboard.writeText(textToCopy);
                      toast("Resposta sugerida copiada.");
                    }}
                    className="text-xs text-muted-foreground hover:text-foreground underline-offset-2 hover:underline"
                  >
                    Copiar texto
                  </button>
                </div>
                <div className="bg-muted border border-border rounded-lg p-4">
                  <p className="text-foreground whitespace-pre-wrap">
                    {email.suggested_response}{" "}
                    <span className="font-semibold text-blue-700">
                      AutoU Digital
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
