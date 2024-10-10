import SearchInput from '@/components/atoms/searchInput';
import CircularChart from '@/components/molecules/circular-chart-Props'
import TabsUi from '@/components/molecules/tabsUi'
import ListObjectivesAssigned from '@/components/organisms/ListObjectivesAssigned';
import ListObjetives from '@/components/organisms/ListObjetives';
import React from 'react'

export default function ScoreBalanceDeparment() {
    const tabs = [
        {
          label: 'Objetivos asignados',
          content: <div><ListObjectivesAssigned/></div>,
        },
        {
          label: 'Lista de objetivos',
          content: <div><SearchInput placeholder={'Buscar objetivos'}/><ListObjetives/></div>,
        },
      ];

  return (
    <div className='p-10'>
         <p className="relative top-1 font-normal text-[1.2rem] l mb-8">Balance score</p>
         {/* card group balance */}
          <div className='block md:flex gap-2 mb-3'>
           <div className='mb-3'>
             <CircularChart progress={50} size={70} strokeWidth={10} label="Meta Financiera" />
           </div>
           <div className='mb-3'>
             <CircularChart progress={50} size={70} strokeWidth={10} label="Meta Financiera" />
           </div>
           <div className='mb-3'>
             <CircularChart progress={50} size={70} strokeWidth={10} label="Meta Financiera" />
           </div>
          </div>

          {/* componnet list */}
         <TabsUi tabs={tabs} />
         
    </div>
  )
}
