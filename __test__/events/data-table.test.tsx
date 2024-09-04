// DataTable.test.tsx
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, test } from "vitest";
import { DataTable } from "../../app/host/dashboard/events/data-table";
import { columns } from "../../app/host/dashboard/events/columns";
import { Event } from "../../app/host/dashboard/events/columns";
import Page from "@/app/host/dashboard/events/[id]/page";

// Datos de prueba
const mockData: Event[] = [
  {
    id: 1,
    eventName: "Desarrollo de software movil. USO",
    eventType: 1,
    startingDate: new Date("2024-05-18 21:35:30"),
  },
  {
    id: 2,
    eventName: "Desarrollo no-code IEEE",
    eventType: 2,
    startingDate: new Date("2024-12-18 21:35:30"),
  },
];

test("Renderizar la tabla de eventos de manera correcta", () => {
  render(<DataTable columns={columns} data={mockData} />);

  // Verifica que los datos se renderizan en la tabla
  expect(screen.getByText("Desarrollo de software movil. USO")).toBeDefined();
  expect(screen.getByText("Desarrollo no-code IEEE")).toBeDefined();

  expect(screen.getByText("18/may/2024")).toBeDefined();
  expect(screen.getByText("18/dic/2024")).toBeDefined();
});

describe("Integración entre la el componente Page y el DataTable", () => {
  it("Renderiza el comoponente Page junto al componente DataTable", async () => {
    render(<Page params={{ id: "1" }} />);

    // Espera a que los datos se carguen y la tabla se renderice
    await waitFor(() => {
      expect(screen.getByText("Participantes")).toBeDefined();
      expect(screen.getByText("Charlas")).toBeDefined();
      expect(screen.getByText("Fechas")).toBeDefined();
    });

    // Verifica que la tabla de temas se haya renderizado correctamente
    expect(screen.getByText("Nombre")).toBeDefined();
    expect(screen.getByText("Descripción")).toBeDefined();
    expect(screen.getByText("Ubicación")).toBeDefined();
    expect(screen.getByText("Hora de inicio")).toBeDefined();
    expect(screen.getByText("Fecha de Fin")).toBeDefined();
    expect(screen.getByText("ID de Conferencia")).toBeDefined();

    // Verifica que los datos de los temas se hayan renderizado correctamente
    expect(screen.getByText("Topic 1")).toBeDefined();
    expect(screen.getByText("Topic 2")).toBeDefined();

    // Verifica que los botones de paginación estén presentes
    expect(screen.getByText("Anterior")).toBeDefined();
    expect(screen.getByText("Siguiente")).toBeDefined();
  });
});
