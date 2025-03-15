import { Button } from "@/components/ui/button";
import { useBudget } from "../Contex/useBudget";
import { useState } from "react";

export default function Modal({ onClose }) {
    const { dispatch } = useBudget()

    const [name, setName] = useState("");
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState("0"); 
    const [date, setDate] = useState("");
  console.log(name, amount, category, date)

    const handleAccept = () => {
      if (name && amount > 0 && category !== "0" && date) {
        const newExpense = {
          id: Date.now(), 
          name,
          amount: Number(amount),
          category,
          date,
        };
        dispatch({ type: "ADD_EXPENSE", payload: newExpense });
       dispatch({ type: "ADD_EXPENSES", payload: { amount: amount } });
        onClose();
      } else {
        alert("Por favor, completa todos los campos correctamente.");
      }
    };
  
  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="mb-4 text-lg font-semibold text-center">Nuevo Gasto</div>
        <div>
          <label className="block mb-2">Nombre del Gasto:</label>
          <input id="name" type="text" value={name} onChange={(e)=> setName(e.target.value) } className="w-full border border-gray-300 rounded-md p-2 mb-4" />
          <label className="block mb-2">Cantidad:</label>
          <input type="number" min="0" id="amount" value={amount} onChange={(e)=> setAmount(e.target.value)} className="w-full border border-gray-300 rounded-md p-2 mb-4"
            onKeyDown={(e) => {
              if (e.key === '-') {
                e.preventDefault();
              }
            }}
          />
          <label className="block mb-2">Categoria:</label>
          <select id="category" value={category} onChange={(e)=> setCategory(e.target.value)} className="w-full border border-gray-300 rounded-md p-2 mb-4">
            <option value='0' disabled>--Seleccione--</option>
            <option value="Ahorro">Ahorro</option>
            <option value="Comida">Comida</option>
            <option value="Casa">Casa</option>
            <option value="Gastos Varios">Gastos Varios</option>
            <option value="Ocio">Ocio</option>
            <option value="Salud">Salud</option>
            <option value="Suscripciones">Suscripciones</option>
          </select>
          <label className="block mb-2">Fecha:</label>
          <input id="date" value={date} onChange={(e)=> setDate(e.target.value)} type="date" className="w-full border border-gray-300 rounded-md p-2 mb-4" />
        </div>
        <div className="flex justify-between">
          <Button onClick={onClose} className="bg-blue-500 text-white">
            Cerrar
          </Button>
          <Button className="bg-blue-500 text-white"
            onClick={handleAccept}>
            Aceptar
          </Button>
        </div>
      </div>
    </div>
  );
}