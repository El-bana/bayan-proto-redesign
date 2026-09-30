import { useState } from "react";

export interface ColumnConfig {
  key: string;
  label: string;
  isVisible: boolean;
}

export function useColumnVisibility(initialColumns: ColumnConfig[]) {
  const [columns, setColumns] = useState<ColumnConfig[]>(initialColumns);
  const [isOpen, setIsOpen] = useState(false);

  const toggleColumn = (key: string) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.key === key ? { ...col, isVisible: !col.isVisible } : col,
      ),
    );
  };

  const showAll = () =>
    setColumns((prev) => prev.map((col) => ({ ...col, isVisible: true })));
  const hideAll = () =>
    setColumns((prev) => prev.map((col) => ({ ...col, isVisible: false })));
  const isVisible = (key: string) =>
    columns.find((col) => col.key === key)?.isVisible ?? true;

  return {
    columns,
    isOpen,
    openModal: () => setIsOpen(true),
    closeModal: () => setIsOpen(false),
    toggleColumn,
    showAll,
    hideAll,
    isVisible,
  };
}
