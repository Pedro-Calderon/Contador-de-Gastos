import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BudgetProvider,BudgetContext } from './Contex/BudgetContext.jsx'

createRoot(document.getElementById('root')).render(
      <BudgetProvider>
            <App />
      </BudgetProvider>

)
