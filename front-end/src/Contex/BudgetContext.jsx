  import { createContext, useReducer } from "react";

  const Action = {
    SET_BUDGET: "SET_BUDGET",
    ADD_EXPENSE: "ADD_EXPENSE",
    ADD_EXPENSES: "ADD_EXPENSES",
    RESET_APP: "RESET_APP",
    DEL_EXPENSES: "DEL_EXPENSES"
  }

  const budgetReducer = (state, action) => {
    switch (action.type) {
      case Action.SET_BUDGET:
        localStorage.setItem("budget", action.payload)
        return {...state, budget: action.payload}

      case Action.ADD_EXPENSE:
      { const updatedExpenses = [...state.expenses, action.payload];
        localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
        console.log("Gasto: ",action.payload)
        return { ...state, expenses: updatedExpenses }}

      case Action.ADD_EXPENSES:
       { const newExpensesAmount = Number(action.payload.amount)
        const newTotalAmount = Number(state.totalAmount + newExpensesAmount)
        localStorage.setItem("totalAmount", newTotalAmount)
         // restar a presupuesto
        const updatespent = Number(state.totalAmount + newExpensesAmount)
        const remainingBudget = Number(state.budget - updatespent)
        localStorage.setItem("remainingBudget", remainingBudget)
        return { ...state, totalAmount: newTotalAmount,spent: updatespent, remainingBudget: remainingBudget }}
      
      case Action.RESET_APP:
        localStorage.removeItem("expenses")
        localStorage.removeItem("totalAmount")
        localStorage.removeItem("remainingBudget")
        return {...state, expenses: [], totalAmount: 0, remainingBudget: 0 }
      
      case Action.DEL_EXPENSES:
       { 
        const newExpenses = state.expenses.filter(element => element.id !== action.payload);
        localStorage.setItem("expenses", JSON.stringify(newExpenses));
        const newExpensesDelate = state.expenses.filter(element => element.id === action.payload);
       
        const newTotalAmount = state.totalAmount - newExpensesDelate[0].amount
        localStorage.setItem("totalAmount", newTotalAmount)
       
        const remainingBudgets = newExpensesDelate[0].amount + state.remainingBudget
        localStorage.setItem("remainingBudget", remainingBudgets)

        return{... state, expenses: newExpenses, totalAmount: newTotalAmount, remainingBudget: remainingBudgets}
       }
        default:
        return state
    }
  }

  export const BudgetContext = createContext()

  export const BudgetProvider = ({children}) => {
      const initialBudget = Number(localStorage.getItem("budget")) || 0
      const initialExpenses = JSON.parse(localStorage.getItem("expenses")) || []
      const initialTotalAmount = Number(localStorage.getItem("totalAmount")) || 0
      const initialremain = Number(localStorage.getItem("remainingBudget")) ||  0

      const [state, dispatch] = useReducer(
          budgetReducer, 
          {budget: initialBudget,
          expenses: initialExpenses,
          totalAmount: initialTotalAmount ,
          remainingBudget: initialremain
          }
        )

      return (
          <BudgetContext.Provider value={{state, dispatch}}>
              {children}
          </BudgetContext.Provider>
          )
  }

