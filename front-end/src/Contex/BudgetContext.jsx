  import { createContext, useReducer } from "react";

  const Action = {
    SET_BUDGET: "SET_BUDGET",
    ADD_EXPENSE: "ADD_EXPENSE",
    ADD_EXPENSES: "ADD_EXPENSES"  
  }

  const budgetReducer = (state, action) => {
    switch (action.type) {
      case Action.SET_BUDGET:
        localStorage.setItem("budget", action.payload)
        return {...state, budget: action.payload}

      case Action.ADD_EXPENSE:
      { const updatedExpenses = [...state.expenses, action.payload];
        localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
        return { ...state, expenses: updatedExpenses }}

      case Action.ADD_EXPENSES:
       { const newExpensesAmount = action.payload.amount
        const newTotalAmount = Number(state.totalAmount + newExpensesAmount)
        localStorage.setItem("totalAmount", newTotalAmount)
        return { ...state, totalAmount: newTotalAmount, expenses: [...state.expenses, action.payload] }}
      default:
        return state
    }
  }

  export const BudgetContext = createContext()

  export const BudgetProvider = ({children}) => {
      const initialBudget = Number(localStorage.getItem("budget")) || 0
      const initialExpenses = JSON.parse(localStorage.getItem("expenses")) || []
      const initialTotalAmount = Number(localStorage.getItem("totalAmount")) || 0

      const [state, dispatch] = useReducer(
          budgetReducer, 
          {budget: initialBudget,
          expenses: initialExpenses,
          totalAmount: initialTotalAmount 
          }
        )

      return (
          <BudgetContext.Provider value={{state, dispatch}}>
              {children}
          </BudgetContext.Provider>
          )
  }

