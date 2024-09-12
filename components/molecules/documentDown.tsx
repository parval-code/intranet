import React from 'react';
import Image from 'next/image';

const DocumentDown = () => {
  const documentsList = [
    {
      name: 'Declaración Jurada Patrimonial',
      imageSrc: '/icon_form.svg',
      urlDownload: '/Declaracion-Jurada-Patrimonial.docx',
      description: 'Colaborador tendrá la facilidad de descargar el formulario de Declaración Jurada Patrimonial.',
    },
  ];

  const handleDownload = (url: string, fileName: string) => {
    const link = document.createElement('a') as HTMLAnchorElement;
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div className="bg-white">
        <main>
          {/* Document grid */}
          <div className="mx-auto max-w-5xl px-4 py-24 sm:px-6 sm:py-20 lg:px-8">
            {/* <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0"> */}
            <div className="flex justify-center gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0">
              {documentsList.map((docum) => (
                <div
                  key={docum.name}
                  className={'text-center md:flex md:items-start md:text-left lg:block lg:text-center'}
                  onClick={() => handleDownload(docum.urlDownload, `${docum.name}.docx`)}
                >
                  <div className="md:flex-shrink-0 cursor-pointer">
                    <div className="flow-root">
                      <Image
                        priority
                        width={1024}
                        height={1024}
                        src={docum.imageSrc} 
                        alt={"logo de parval"}
                        className={"-my-1 mx-auto h-24 w-auto"}
                      />
                    </div>
                  </div>
                  <div className="mb-10 cursor-pointer mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                    <h3 className="text-[15px] font-medium text-gray-900">{docum.name}</h3>
                    <p className="mt-3 text-[11px] text-gray-500">{docum.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DocumentDown;
