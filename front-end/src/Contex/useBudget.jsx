import { useContext } from "react";
import { BudgetContext } from "./BudgetContext";

export const useBudget = () => {
  const context = useContext(BudgetContext)
  if (!context) {
    throw new Error("No hay un provider de BudgetContext");
  } else {
    return context
  }

}