import { ClipboardListIcon } from "lucide-react";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export function EmptyState() {
  return (
    <Empty className="border border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <ClipboardListIcon />
        </EmptyMedia>
        <EmptyTitle>Você ainda não tem tarefas</EmptyTitle>
        <EmptyDescription>
          Use o formulário acima para criar a primeira.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
