import { Button } from "@/components/ui/button";

export default function Modal({ onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="mb-4 text-lg font-semibold">Soy una ventana modal</div>
        <div className="flex justify-between">
          <Button onClick={onClose} className="bg-blue-500 text-white">
            Cerrar
          </Button>
          <Button className="bg-blue-500 text-white">
            Aceptar
          </Button>
        </div>
      </div>
    </div>
  );
}