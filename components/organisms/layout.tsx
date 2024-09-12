import React, { useState } from 'react'
import SidebarUi from '../molecules/sidebarUi';
import HeaderUi from '../molecules/headerUi'


interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout ({ children }: LayoutProps)  {
  const [show, setShow] = useState(true);

  return (
    <div className='flex'>
    {/* Component Sidebar */}
      <SidebarUi
        isOpen={show}
        setIsOpen={() => setShow(!show)}
      />
    {/* style header and content */}


    <div className='flex-grow-[100]'>
     <HeaderUi/>
      <main className="overflow-scroll">
        <div>{children}</div>
      </main>
    </div>
  </div>
  )
}
