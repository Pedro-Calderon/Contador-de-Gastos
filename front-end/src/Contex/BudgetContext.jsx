import { createContext, useReducer } from "react";

const Action = {
  SET_BUDGET: "SET_BUDGET",
}

const budgetReducer = (state, action) => {
  switch (action.type) {
    case Action.SET_BUDGET:
      localStorage.setItem("budget", action.payload)
      return {...state, budget: action.payload}
    
    default:
      return state
  }
}

export const BudgetContext = createContext()

export const BudgetProvider = ({children}) => {
    const initialBudget = Number(localStorage.getItem("budget")) || 0

    const [state, dispatch] = useReducer(
        budgetReducer, 
        {budget: initialBudget}
      )

    return (
        <BudgetContext.Provider value={{state, dispatch}}>
            {children}
        </BudgetContext.Provider>
        )
}

