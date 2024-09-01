import PlusCircleIcon from "@heroicons/react/24/outline/PlusCircleIcon";
import { Button } from "../ui/button";

const EmptyAgendaMessage = () => (
  <div className="flex flex-col items-center justify-center h-full text-center p-6">
    <svg
      className="w-48 h-48 mb-6 text-gray-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={0.5}
        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
      />
    </svg>
    <p className="text-xl font-semibold mb-2">
      Parece que no has creado ninguna charla.
    </p>
    <p className="text-gray-500 mb-6">
      Crea una haciendo clic en el botón crear charla.
    </p>
    <Button>
      <PlusCircleIcon className="mr-2 h-4 w-4" />
      Crear charla
    </Button>
  </div>
);

export { EmptyAgendaMessage };
