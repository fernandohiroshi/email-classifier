import { API_URL } from "./constants";
import { ProcessResponse } from "@/types";

export async function processText(
  text: string,
  sender: string
): Promise<ProcessResponse> {
  const response = await fetch(`${API_URL}/process-text`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text, sender }),
  });

  if (!response.ok) {
    throw new Error("Erro ao processar texto");
  }

  return response.json();
}

export async function processFile(
  file: File,
  sender: string
): Promise<ProcessResponse> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("sender", sender);

  const response = await fetch(`${API_URL}/process-file`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Erro ao processar arquivo");
  }

  return response.json();
}

export async function getEmails() {
  const response = await fetch(`${API_URL}/emails`);

  if (!response.ok) {
    throw new Error("Erro ao buscar emails");
  }

  return response.json();
}

export async function getStats() {
  const response = await fetch(`${API_URL}/stats`);

  if (!response.ok) {
    throw new Error("Erro ao buscar estatísticas");
  }

  return response.json();
}
