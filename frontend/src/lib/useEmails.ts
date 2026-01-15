import { useEffect, useState } from "react";
import { Email, Stats } from "@/types";
import { getEmails } from "@/lib/api";

export function useEmails() {
  const [emails, setEmails] = useState<Email[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchEmails = async () => {
    try {
      setIsLoading(true);
      const data = await getEmails();
      setEmails(data.emails ?? []);
    } catch (error) {
      console.error("Erro ao carregar emails:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchEmails();
  }, []);

  const calculateStats = (): Stats => {
    const productive = emails.filter((e) => e.category === "Produtivo").length;
    const unproductive = emails.filter(
      (e) => e.category === "Improdutivo"
    ).length;

    const senderCount = emails.reduce((acc, email) => {
      acc[email.sender] = (acc[email.sender] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topSender = Object.entries(senderCount).sort(
      (a, b) => b[1] - a[1]
    )[0] || ["N/A", 0];

    const dateCount = emails.reduce((acc, email) => {
      const date = new Date(email.date).toISOString().split("T")[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const emailsByDay = Object.entries(dateCount)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(-7);

    // Top 5 emails improdutivos (remetentes com mais emails improdutivos)
    const unproductiveBySender = emails
      .filter((e) => e.category === "Improdutivo")
      .reduce((acc, email) => {
        acc[email.sender] = (acc[email.sender] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

    const responseTypes = Object.entries(unproductiveBySender)
      .map(([sender, count]) => ({ type: sender, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return {
      totalEmails: emails.length,
      productive,
      unproductive,
      topSender: { email: topSender[0], count: topSender[1] },
      emailsByDay,
      responseTypes,
    };
  };

  const stats = calculateStats();

  return {
    emails,
    isLoading,
    stats,
    fetchEmails,
  };
}
