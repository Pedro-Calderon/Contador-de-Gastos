import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBudget } from "../Contex/useBudget";

function HomePage() {

  const [budgetInput, setbudgetInput] = useState("")
  const { dispatch } = useBudget()

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setbudgetInput(e.target.value)
  }
  const handleAccept = () => {
    const budgetValue= Number(budgetInput)
    localStorage.setItem("budget", budgetValue)
    dispatch({ type: "SET_BUDGET", payload: budgetValue})
  }

  const handleValidation = () => {
    const budgetValue= Number(budgetInput)

    if (budgetValue === 0) {
      alert("Ingrese un monto")
      return false
    }
    handleAccept()
    setTimeout(() => {
      navigate("/gastos");
    }, 100);
  }


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center border border-gray-400 border-opacity-50 p-9 rounded-md">
        <h1 className="text-3xl font-bold mb-4">Contador de Gastos</h1>
        <input type="number" value={budgetInput} onChange={handleInputChange} className="border border-gray-300 rounded-md p-2 mb-4 w-full" placeholder="Ingrese Monto" />
        <Button variant="default" className="bg-black text-white hover:bg-blue-700 w-full"
          onClick={handleValidation}>
          Aceptar
        </Button>
      </div>
    </div>
  )
}

export default HomePage
