import React from 'react'
import { Button } from "@/components/ui/button";
import { List, Plus } from 'lucide-react'; 
import { useBudget } from '../Contex/useBudget';
import { useContext } from 'react';
import { ModalContext } from '../Contex/ContexModal.jsx';
import { createPortal } from 'react-dom';
import Modal from './Modal.jsx';
import ListaGastos from './ListaGastos.jsx';

function Gastos() {
    const {state}= useBudget()
      const {showModal, openModal, closeModal } = useContext(ModalContext)
    

    const gastado = 0.00.toFixed(2);
    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 relative'>
            <div className='flex flex-col items-center justify-center border border-gray-400 border-opacity-50 p-9 rounded-md w-full max-w-md'>
                <h1 className='text-4xl font-bold mb-4'>Contador de Gastos</h1>
                <div className='flex items-center'>
                    <div className='bg-red-500 p-4 mr-4 text-white'>Aqui va la grafica</div>
                    <div className='flex flex-col items-center'>
                        <Button variant="outline" className="w-full">Reset APP</Button>
                        <h1 className='text-blue-500 font-bold mt-4'>Presupuesto: <label className='font-bold text-black'>${state.budget}</label></h1>
                        <h1 className='text-blue-500 font-bold mt-4'>Disponible: <label className='font-bold text-black'>${state.totalAmount }</label></h1>
                        <h1 className='text-blue-500 font-bold mt-4'>Gastado: <label className='font-bold text-black'>${gastado}</label></h1>
                    </div>
                </div>
            </div>
            
            <div className='flex flex-col items-center justify-center border border-gray-400 border-opacity-50 p-9 rounded-md mt-8 w-full max-w-md'>
                <div className='flex items-center w-full'>
                    <div className='mr-4 w-full'>Filtrar gastos</div>
                    <select defaultValue="0" className='border border-gray-300 rounded-md p-2 mb-4 w-full'>
                        <option value='0' disabled>--Seleccione--</option>
                        <option value='1'>Ahorro</option>
                        <option value='2'>Comida</option>
                        <option value='3'>Casa</option>
                        <option value='4'>Gastos Varios</option>
                        <option value='5'>Ocio</option>
                        <option value='6'>Salud</option>
                        <option value='7'>Suscripciones</option>
                    </select>
                </div>
            </div>

            <div className='flex flex-col items-center justify-center border border-gray-400 border-opacity-50 p-9 rounded-md mt-8 w-full max-w-md'>
                <div className='flex items-center justify-center w-full'>
                  { state.expenses?.length > 0 ? (
                    
                     <ListaGastos className="w-full" />
                  ) : 
                    <p>No hay gastos registrados</p>
                  }
                </div>
            </div>

            <Button className="rounded-full w-12 h-12 p-0 flex items-center justify-center bg-black text-white fixed bottom-8 right-8"
            onClick={() => openModal()}>
                <Plus className="h-6 w-6" /> 
            </Button>
            {showModal && createPortal(
                    <Modal onClose={() => closeModal()} />,
                    document.body
                  )}
        </div>
    )
}

export default Gastos
