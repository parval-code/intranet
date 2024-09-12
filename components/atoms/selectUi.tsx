import React from 'react'

export default function SelectUi() {
  return (
    <div>
    <div>
      <select
        id="location"
        name="location"
        className="block w-full h-[40px]	rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-parvalColor sm:text-sm sm:leading-6"
        defaultValue="Moneda"
      >
        <option>Asigne un permiso</option>
        <option>DOP</option>
        <option>USD</option>
      </select>
    </div>
    </div>
  )
}
