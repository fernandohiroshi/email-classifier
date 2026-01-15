import { Email } from "@/types";
import { formatDate } from "@/lib/utils";
import { Badge } from "../ui/badge";

interface EmailCardProps {
  email: Email;
  onClick: () => void;
}

export default function EmailCard({ email, onClick }: EmailCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-neutral-900 mb-1">
            {email.subject}
          </h3>
          <p className="text-sm text-neutral-600">{email.sender}</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge
            variant={email.category === "Produtivo" ? "default" : "secondary"}
          >
            {email.category}
          </Badge>
          <span className="text-xs text-neutral-500">
            {formatDate(email.date)}
          </span>
        </div>
      </div>
    </div>
  );
}
