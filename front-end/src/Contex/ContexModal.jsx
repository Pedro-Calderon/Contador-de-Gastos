import { useState, createContext } from "react";

// 🔹 Asegúrate de que el nombre sea coherente
export const ModalContext = createContext();

function ModalContextProvider({ children }) {  // 🔹 Corrige el nombre aquí
    const [showModal, setShowModal] = useState(false);

    function openModal() {
        setShowModal(true);
    }

    function closeModal() {
        setShowModal(false);
    }

    const data = {
        showModal,
        openModal,
        closeModal
    };

    return (
        <ModalContext.Provider value={data}>  {/* 🔹 Corrige aquí también */}
            {children}
        </ModalContext.Provider>
    );
}

export default ModalContextProvider;  // 🔹 Exporta correctamente
