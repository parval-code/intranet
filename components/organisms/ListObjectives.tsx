import React from 'react';
import HorizonCard from '../molecules/HorizonCard';

interface Objective {
  name: string;
  id: string;
  cargo: string;
  departamento: string;
  progreso: number;
}

export default function ListObjectives() {
  const objectives: Objective[] = [
    {
      name: "Judith Vargas",
      id: "909390",
      cargo: "Sub gerente de calidad y proceso",
      departamento: "Recursos Humanos",
      progreso: 50,
    },
    {
      name: "Carlos Pérez",
      id: "102345",
      cargo: "Gerente de Finanzas",
      departamento: "Finanzas",
      progreso: 70,
    },
    {
      name: "Ana Gómez",
      id: "678901",
      cargo: "Directora de Marketing",
      departamento: "Marketing",
      progreso: 85,
    },
  ];

  return (
    <div>
      {objectives.map((objective) => (
        <HorizonCard
          key={objective.id}
          name={objective.name}
          id={objective.id}
          cargo={objective.cargo}
          departamento={objective.departamento}
          progreso={objective.progreso}
        />
      ))}
    </div>
  );
}
