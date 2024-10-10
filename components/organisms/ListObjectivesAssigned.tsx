import React from 'react';
import HorizonCard from '../molecules/HorizonCard';

interface Objective {
  name: string;
  id: string;
  cargo: string;
  departamento: string;
  progreso: number;
  imageUrl: string; // Añadir imageUrl a la interfaz
}

export default function ListObjectivesAssigned() {
  const objectives: Objective[] = [
    {
      name: "Judith Vargas",
      id: "909390",
      cargo: "Sub gerente de calidad y proceso",
      departamento: "Recursos Humanos",
      progreso: 50,
      imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", // URL de la imagen
    },
    {
      name: "Carlos Pérez",
      id: "102345",
      cargo: "Gerente de Finanzas",
      departamento: "Finanzas",
      progreso: 70,
      imageUrl: "https://images.unsplash.com/photo-1502767089025-6572583495ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80", // URL de la imagen
    },
    {
      name: "Ana Gómez",
      id: "678901",
      cargo: "Directora de Marketing",
      departamento: "Marketing",
      progreso: 85,
      imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80", // URL de la imagen
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
          imageUrl={objective.imageUrl} // Pasar imageUrl por props
        />
      ))}
    </div>
  );
}
