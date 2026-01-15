"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import UploadPage from "@/components/pages/UploadPage";
import HistoryPage from "@/components/pages/HistoryPage";
import DashboardPage from "@/components/pages/DashboardPage";
import { useEmails } from "@/lib/useEmails";

export default function Home() {
  const [currentPage, setCurrentPage] = useState<
    "upload" | "history" | "dashboard"
  >("upload");
  const { emails, isLoading, stats, fetchEmails } = useEmails();

  return (
    <div className="flex min-h-screen flex-col bg-background md:flex-row">
      <Sidebar
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        stats={{
          total: emails.length,
          productive: stats.productive,
        }}
      />

      <div className="flex-1 flex flex-col overflow-hidden bg-background dark:bg-neutral-900">
        <main className="flex-1 overflow-auto">
          {currentPage === "upload" && (
            <UploadPage onEmailProcessed={fetchEmails} />
          )}
          {currentPage === "history" && (
            <HistoryPage emails={emails} isLoading={isLoading} />
          )}
          {currentPage === "dashboard" && (
            <DashboardPage stats={stats} isLoading={isLoading} />
          )}
        </main>

        <footer className="border-t border-border bg-card px-4 py-3 text-xs text-muted-foreground sm:text-sm">
          <div className="mx-auto flex max-w-6xl justify-center">
            <p className="text-center">
              Este app foi desenvolvido por{" "}
              <a
                href="https://fernandohiroshi.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground hover:underline"
              >
                Fernando Hiroshi
              </a>
              .
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
