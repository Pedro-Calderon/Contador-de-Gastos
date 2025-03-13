import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BudgetProvider,BudgetContext } from './Contex/BudgetContext.jsx'
import ModalContextProvider from "./Contex/ContexModal.jsx"

createRoot(document.getElementById('root')).render(
      <BudgetProvider>
            <ModalContextProvider>
                  <App />
            </ModalContextProvider>
      </BudgetProvider>

)
