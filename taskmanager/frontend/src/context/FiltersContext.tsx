import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { useSearchParams } from "react-router-dom";

export type Filters = {
  status: string;
  priority: string;
  deadline: string;
};

type FiltersContextType = {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  isFiltersOpen: boolean;
  toggleFilters: () => void;
  handleFilterChange: (e: React.MouseEvent, type: "status" | "priority", value: string) => void;
};

const FiltersContext = createContext<FiltersContextType | null>(null);

export const FiltersProvider = ({ children }: { children: ReactNode }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    status: searchParams.get("status") || "",
    priority: searchParams.get("priority") || "",
    deadline: searchParams.get("deadline") || "",
  });

  const toggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };

  const handleFilterChange = (
    e: React.MouseEvent,
    type: "status" | "priority",
    value: string
  ) => {
    e.stopPropagation();
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type] === value ? "" : value,
    }));
  };

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.status) params.set("status", filters.status);
    if (filters.priority) params.set("priority", filters.priority);
    if (filters.deadline) params.set("deadline", filters.deadline);
    setSearchParams(params);
  }, [filters, setSearchParams]);

  return (
    <FiltersContext.Provider value={{ filters, setFilters, isFiltersOpen, toggleFilters, handleFilterChange }}>
      {children}
    </FiltersContext.Provider>
  );
};

export const useFilters = (): FiltersContextType => {
  const ctx = useContext(FiltersContext);
  if (!ctx) throw new Error("useFilters must be used inside <FiltersProvider>");
  return ctx;
};
