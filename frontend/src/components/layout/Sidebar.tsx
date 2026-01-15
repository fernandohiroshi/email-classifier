"use client";

import Image from "next/image";
import { Upload, Inbox, BarChart3 } from "lucide-react";
import { Button } from "../ui/button";

interface SidebarProps {
  currentPage: "upload" | "history" | "dashboard";
  onPageChange: (page: "upload" | "history" | "dashboard") => void;
  stats: {
    total: number;
    productive: number;
  };
}

export default function Sidebar({
  currentPage,
  onPageChange,
  stats,
}: SidebarProps) {
  const menuItems = [
    { id: "upload", label: "Upload", icon: Upload },
    { id: "history", label: "Histórico", icon: Inbox },
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  ] as const;

  return (
    <div className="w-full md:w-64 bg-card border-b md:border-b-0 md:border-r border-border flex flex-col">
      <div className="p-4 md:p-6 border-b border-border">
        <div className="mb-3 flex justify-center">
          <Image
            src="/logo.png"
            alt="Email Classifier logo"
            width={64}
            height={64}
            className="rounded-full brightness-110 opacity-95"
            priority
            quality={100}
          />
        </div>
        <h1 className="text-lg md:text-xl font-bold text-foreground">
          Email Classifier
        </h1>
        <p className="text-xs md:text-sm text-muted-foreground mt-1">
          Powered by AI
        </p>
      </div>

      <nav className="flex-1 p-4" aria-label="Navegação principal">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            type="button"
            variant={currentPage === item.id ? "default" : "ghost"}
            className={`w-full justify-start gap-3 mb-2 ${
              currentPage === item.id
                ? "bg-neutral-900 text-white hover:bg-neutral-900/90"
                : "text-neutral-700 hover:bg-neutral-100"
            }`}
            aria-current={currentPage === item.id ? "page" : undefined}
            onClick={() => onPageChange(item.id)}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </Button>
        ))}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="text-sm text-muted-foreground">
          <div className="flex justify-between mb-2">
            <span>Total de emails:</span>
            <span className="font-semibold text-foreground">{stats.total}</span>
          </div>
          <div className="flex justify-between">
            <span>Produtivos:</span>
            <span className="font-semibold text-emerald-500">
              {stats.productive}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
