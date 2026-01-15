"use client";

import { useMemo, useState } from "react";
import { Search, Inbox } from "lucide-react";
import { Email } from "@/types";
import EmailModal from "../features/EmailModal";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../ui/table";
import { Badge } from "../ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { Skeleton } from "../ui/skeleton";

interface HistoryPageProps {
  emails: Email[];
  isLoading?: boolean;
}

export default function HistoryPage({ emails, isLoading }: HistoryPageProps) {
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "alphabetical">("date");
  const [filterCategory, setFilterCategory] = useState<
    "all" | "Produtivo" | "Improdutivo"
  >("all");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const filteredEmails = useMemo(() => {
    let filtered = emails;

    if (filterCategory !== "all") {
      filtered = filtered.filter((e) => e.category === filterCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (e) =>
          e.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          e.sender.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    const sorted = filtered.sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return a.subject.localeCompare(b.subject);
    });

    return sorted;
  }, [emails, filterCategory, searchTerm, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredEmails.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filteredEmails.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
        Histórico de Emails
      </h2>
      <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">
        Visualize e gerencie todos os emails processados
      </p>

      <div className="bg-card rounded-xl shadow-sm border border-border p-4 sm:p-6 mb-6">
        <div className="flex flex-col gap-4 md:flex-row md:flex-wrap">
          <div className="flex-1 min-w-[220px]">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                size={20}
              />
              <Input
                type="text"
                placeholder="Buscar por assunto ou remetente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10"
              />
            </div>
          </div>

          <Select
            value={sortBy}
            onValueChange={(value: "date" | "alphabetical") => setSortBy(value)}
          >
            <SelectTrigger size="sm">
              <SelectValue placeholder="Ordenar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Mais recentes</SelectItem>
              <SelectItem value="alphabetical">Alfabética</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filterCategory}
            onValueChange={(value: "all" | "Produtivo" | "Improdutivo") =>
              setFilterCategory(value)
            }
          >
            <SelectTrigger size="sm">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas categorias</SelectItem>
              <SelectItem value="Produtivo">Produtivo</SelectItem>
              <SelectItem value="Improdutivo">Improdutivo</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="bg-card rounded-xl shadow-sm border border-border">
        {isLoading ? (
          <div className="p-6">
            <div className="space-y-2 mb-4">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-1/4" />
            </div>
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          </div>
        ) : filteredEmails.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Inbox size={48} className="mx-auto mb-4 opacity-50" />
            <p>Nenhum email encontrado</p>
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Remetente</TableHead>
                  <TableHead>Assunto</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Data</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pageItems.map((email) => (
                  <TableRow
                    key={email.id}
                    onClick={() => setSelectedEmail(email)}
                    className="cursor-pointer"
                  >
                    <TableCell className="max-w-[220px] truncate">
                      {email.sender}
                    </TableCell>
                    <TableCell className="max-w-[260px] truncate">
                      {email.subject}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          email.category === "Produtivo"
                            ? "default"
                            : "secondary"
                        }
                        className={
                          (email.category === "Produtivo"
                            ? "bg-emerald-100 text-emerald-800 border-transparent"
                            : "bg-red-100 text-red-800 border-transparent") +
                          " px-2 py-0.5 text-[0.65rem] font-medium"
                        }
                      >
                        {email.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                      {new Date(email.date).toLocaleString("pt-BR")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-muted">
              <p className="text-xs text-muted-foreground">
                Página {currentPage} de {totalPages} — {filteredEmails.length}{" "}
                emails
              </p>
              <Pagination className="w-auto">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setPage((p) => Math.max(1, p - 1));
                      }}
                      aria-disabled={currentPage === 1}
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setPage((p) => Math.min(totalPages, p + 1));
                      }}
                      aria-disabled={currentPage === totalPages}
                      className={
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </>
        )}
      </div>

      <EmailModal
        email={selectedEmail}
        onClose={() => setSelectedEmail(null)}
      />
    </div>
  );
}
