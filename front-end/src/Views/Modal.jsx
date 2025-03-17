import { Button } from "@/components/ui/button";
import { useBudget } from "../Contex/useBudget";

export default function Modal({ onClose }) {
  const { state, dispatch } = useBudget()

  const handleAcceptUpdate = () => {
    console.log("AQui entro")
    if (state.name && state.amount > 0 && state.category !== "0" && state.date) {
      const newExpense = {
        id: state.id,
        name: state.name,
        amount: Number(state.amount),
        category: state.category,
        date: state.date,

      }
      console.log(newExpense)
      dispatch({ type: "UPDATE_EXPENSES", payload: newExpense })
      dispatch({ type: "TOGGLE_MODAL" })
      onClose()
    }
  }
  const handleOnclose = () => {
    dispatch({ type: "TOGGLE_MODAL" })
    onClose()
  }

  const handleAccept = () => {
    if (state.name && state.amount > 0 && state.category !== "0" && state.date) {
      const newExpense = {
        id: Date.now(),
        name: state.name,
        amount: Number(state.amount),
        category: state.category,
        date: state.date,

      };
      dispatch({ type: "ADD_EXPENSE", payload: newExpense });
      dispatch({ type: "ADD_EXPENSES", payload: { amount: state.amount } });
      console.log("Datos a guardar: ", newExpense)

      onClose();
    } else {
      alert("Por favor, completa todos los campos correctamente.");
    }
  };
  const valor = state.updateModal
  if (valor) {

    return (<div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="mb-4 text-lg font-semibold text-center">Actualizar Gasto</div>
        <div>
          <label className="block mb-2">Nombre del Gasto:</label>
          <input id="name" type="text" value={state.name} onChange={(e) => dispatch({ type: "SET_NAME", payload: e.target.value })} className="w-full border border-gray-300 rounded-md p-2 mb-4" />
          <label className="block mb-2">Cantidad:</label>
          <input type="number" min="0" id="amount" value={state.amount} onChange={(e) => dispatch({ type: "SET_AMOUNT", payload: e.target.value })} className="w-full border border-gray-300 rounded-md p-2 mb-4"
            onKeyDown={(e) => {
              if (e.key === '-') {
                e.preventDefault();
              }
            }}
          />
          <label className="block mb-2">Categoria:</label>
          <select id="category" value={state.category} onChange={(e) => dispatch({ type: "SET_CATEGORY", payload: e.target.value })} className="w-full border border-gray-300 rounded-md p-2 mb-</select>4">
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
          <input id="date" value={state.date} onChange={(e) => dispatch({ type: "SET_DATE", payload: e.target.value })} type="date" className="w-full border border-gray-300 rounded-md p-2 mb-4" />
        </div>
        <div className="flex justify-between">
          <Button onClick={() => { handleOnclose() }} className="bg-blue-500 text-white">
            Cerrar
          </Button>
          <Button className="bg-blue-500 text-white"
            onClick={() => { handleAcceptUpdate() }}>
            Aceptar
          </Button>
        </div>
      </div>
    </div>)
  } else if (!state.updateModal) {

    return (<div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="mb-4 text-lg font-semibold text-center">Agregar Gasto</div>
        <div>
          <label className="block mb-2">Nombre del Gasto:</label>
          <input id="name" type="text" value={state.name} onChange={(e) => dispatch({ type: "SET_NAME", payload: e.target.value })} className="w-full border border-gray-300 rounded-md p-2 mb-4" />
          <label className="block mb-2">Cantidad:</label>
          <input type="number" min="0" id="amount" value={state.amount} onChange={(e) => dispatch({ type: "SET_AMOUNT", payload: e.target.value })} className="w-full border border-gray-300 rounded-md p-2 mb-4"
            onKeyDown={(e) => {
              if (e.key === '-') {
                e.preventDefault();
              }
            }}
          />
          <label className="block mb-2">Categoria:</label>
          <select id="category" value={state.category} onChange={(e) => dispatch({ type: "SET_CATEGORY", payload: e.target.value })} className="w-full border border-gray-300 rounded-md p-2 mb-4">
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
          <input id="date" value={state.date} onChange={(e) => dispatch({ type: "SET_DATE", payload: e.target.value })} type="date" className="w-full border border-gray-300 rounded-md p-2 mb-4" />
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
    </div>)
  }


}