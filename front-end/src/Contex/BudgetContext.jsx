import {  createContext, useReducer } from "react";

const Action = {
  SET_BUDGET: "SET_BUDGET",
  ADD_EXPENSE: "ADD_EXPENSE",
  ADD_EXPENSES: "ADD_EXPENSES",
  RESET_APP: "RESET_APP",
  DEL_EXPENSES: "DEL_EXPENSES",
  SET_NAME: "SET_NAME",
  SET_AMOUNT: "SET_AMOUNT",
  SET_CATEGORY: "SET_CATEGORY",
  SET_DATE: "SET_DATE",
  RECOVERMODAL_EXPENSES: "RECOVERMODAL_EXPENSES",
  UPDATE_EXPENSES: "UPDATE_EXPENSES",
  TOGGLE_MODAL: "TOGGLE_MODAL",
}

const budgetReducer = (state, action) => {
  switch (action.type) {
    case Action.SET_BUDGET:
      localStorage.setItem("budget", action.payload)
      return { ...state, budget: action.payload }

    case Action.ADD_EXPENSE:
      {
        const updatedExpenses = [...state.expenses, action.payload];
        localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
        return { ...state, expenses: updatedExpenses }
      }

    case Action.ADD_EXPENSES:
      {
        const newExpensesAmount = Number(action.payload.amount)
        const newTotalAmount = Number(state.totalAmount + newExpensesAmount)
        localStorage.setItem("totalAmount", newTotalAmount)
        // restar a presupuesto
        const updatespent = Number(state.totalAmount + newExpensesAmount)
        const remainingBudget = Number(state.budget - updatespent)
        localStorage.setItem("remainingBudget", remainingBudget)
        return { ...state, totalAmount: newTotalAmount, spent: updatespent, remainingBudget: remainingBudget }
      }

    case Action.RESET_APP:
      localStorage.removeItem("expenses")
      localStorage.removeItem("totalAmount")
      localStorage.removeItem("remainingBudget")
      return { ...state, expenses: [], totalAmount: 0, remainingBudget: 0 }

    case Action.DEL_EXPENSES:
      {
        const newExpenses = state.expenses.filter(element => element.id !== action.payload);
        localStorage.setItem("expenses", JSON.stringify(newExpenses));
        const newExpensesDelate = state.expenses.filter(element => element.id === action.payload);

        const newTotalAmount = state.totalAmount - newExpensesDelate[0].amount
        localStorage.setItem("totalAmount", newTotalAmount)

        const remainingBudgets = newExpensesDelate[0].amount + state.remainingBudget
        localStorage.setItem("remainingBudget", remainingBudgets)

        return { ...state, expenses: newExpenses, totalAmount: newTotalAmount, remainingBudget: remainingBudgets }
      }
    case Action.SET_NAME:
      return { ...state, name: action.payload }
    case Action.SET_AMOUNT:
      return { ...state, amount: action.payload }
    case Action.SET_CATEGORY:
      return { ...state, category: action.payload }
    case Action.SET_DATE:
      return { ...state, date: action.payload }
    case Action.TOGGLE_MODAL: {
      const newModalState = !state.updateModal
      return { ...state, updateModal: newModalState }
    }
    case Action.RECOVERMODAL_EXPENSES:
      {
        const updatedExpenses = state.expenses.filter(element => element.id === action.payload);
        console.log("Datos a actualizar: ", updatedExpenses)
        
        return { ...state,id:updatedExpenses[0].id, name: updatedExpenses[0].name, amount: updatedExpenses[0].amount, category: updatedExpenses[0].category, date: updatedExpenses[0].date}

      }
    case Action.UPDATE_EXPENSES:
      {
      const updatedExpenses = state.expenses.map(expense => 
        expense.id === action.payload.id ? { ...expense, ...action.payload } : expense
      );
      localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
      const newTotalAmount = updatedExpenses.reduce((total, expense) => total + expense.amount, 0);
      localStorage.setItem("totalAmount", newTotalAmount);
      const remainingBudget = state.budget - newTotalAmount;
      localStorage.setItem("remainingBudget", remainingBudget);
      
    return { ...state, expenses: updatedExpenses, totalAmount: newTotalAmount, remainingBudget: remainingBudget };
      
      }
    default:
      return state
  }
}

export const BudgetContext = createContext()

export const BudgetProvider = ({ children }) => {
  const initialState = {
    budget: Number(localStorage.getItem("budget")) || 0,
    expenses: JSON.parse(localStorage.getItem("expenses")) || [],
    totalAmount: Number(localStorage.getItem("totalAmount")) || 0,
    remainingBudget: Number(localStorage.getItem("remainingBudget")) || 0,
    name: "",
    amount: 0,
    category: "0",
    date: "",
    updateModal: false,

  };
  const [state, dispatch] = useReducer(budgetReducer, initialState)
  return (
    <BudgetContext.Provider value={{ state, dispatch }}>
      {children}
    </BudgetContext.Provider>
  )
}

