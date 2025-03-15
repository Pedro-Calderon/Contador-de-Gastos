import React, { useContext } from 'react';
import { useBudget } from '../Contex/useBudget';
import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';
import { ModalContext } from '../Contex/ContexModal';

function ListaGastos(props) {
  const { state } = useBudget();
  const {openModal } = useContext(ModalContext)
  const category = props.category;
    
  const handleSwipeRight = (gasto) => {
    alert(`Eliminando gasto: ${gasto.name}`);
    // Aquí puedes agregar la lógica para eliminar el gasto
  };

  const handleSwipeLeft = (gasto) => {
    alert(`Actualizando gasto: ${gasto.name}`);
    openModal()
  };

  return (
    <div className="mt-8 text-center bg-gray-100 w-full">
      <h2 className="text-lg font-bold text-center">Gastos Registrados</h2>
      <SwipeableList>
        {state.expenses?.length>0 ?(
       state.expenses.filter((gasto)=>category === "all" || gasto.category===category) .map((gasto) => (
        <SwipeableListItem
          key={String(gasto.id)}
          swipeRight={{
            content: <div className="bg-red-500 text-white p-4">Eliminar</div>,
            action: () => handleSwipeRight(gasto),
          }}
          swipeLeft={{
            content: <div className="bg-blue-500 text-white p-4">Actualizar</div>,
            action: () => handleSwipeLeft(gasto),
          }}
        >
          <div className="border p-4 rounded-md mt-2 shadow-md flex flex-col items-start w-full">
            <h3 className="text-xl font-semibold mb-2">{gasto.name}</h3>
            <p className="text-gray-700 mb-1">Monto: ${gasto.amount}</p>
            <p className="text-gray-700 mb-1">Categoría: {gasto.category}</p>
            <p className="text-gray-500 text-sm">Fecha: {gasto.date}</p>
          </div>
        </SwipeableListItem>
      ))
      
      ) : <p>No hay gastos registrados</p>}
      </SwipeableList>
    </div>
  );
}

export default ListaGastos;
