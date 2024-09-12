import React from 'react'

interface TableUiProps {
  data: any[]; // Cambia "any[]" al tipo adecuado para los datos que esperas
}


export default function TableUi({ data }: TableUiProps)  {
  if (!data || !Array.isArray(data)) {
    return null;
  }

  return (
    <>
    <div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto w-[400px] xl:w-auto md:w-auto sm:w-auto sm:-mx-6 lg:-mx-8 ">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Título
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Mon
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Nominal
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    F. Inicio
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    F. Venc
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Rend
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Pago final
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Plazo total
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Rend Vcto
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
              {data.map((item, index) => (
                  <>
                    <tr key={index}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        <span>{ `${item.Titulo} ${item.Producto}` }</span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.Moneda_abrevia}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.Nominal}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.Fecha}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.Fechavenc}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.Rend}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.Costofinh}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.Plazo}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.Intoper}</td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
