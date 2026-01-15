export interface Email {
  id: string;
  sender: string;
  subject: string;
  content: string;
  category: "Produtivo" | "Improdutivo";
  suggested_response: string;
  date: string;
}

export interface Stats {
  totalEmails: number;
  productive: number;
  unproductive: number;
  topSender: { email: string; count: number };
  emailsByDay: { date: string; count: number }[];
  // Para o gráfico: top 5 remetentes com mais emails improdutivos
  responseTypes: { type: string; count: number }[];
}

export interface ProcessResponse {
  category: string;
  suggested_response: string;
  processed_text: string;
}
