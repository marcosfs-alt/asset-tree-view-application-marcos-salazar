'use client';

import useSelectedItemStore from '@/store/useSelectedItemStore';
import { Asset } from '@/types';
import Image from 'next/image';
//TODO add logic to upload file
const AssetView = () => {
  const { selectedItem }: { selectedItem: Asset | null } =
    useSelectedItemStore();

  return (
    <section className="w-full h-full flex-col">
      {!!selectedItem ? (
        <>
          <header className="h-14 border-b border-gray150 text-lg font-semibold text-gray950 py-3 px-4">
            {selectedItem.name}
          </header>
          <main className="w-full h-full flex-col">
            <section className="flex w-full h-2/5 ">
              <div className="w-1/3 h-full py-6 pl-6 rounded">
                {selectedItem.image ? (
                  <Image src={selectedItem.image} alt="component image" />
                ) : (
                  <div className="bg-blue50 border border-dotted border-blue400 w-full h-full text-blue500 text-center flex items-center justify-center cursor-pointer">
                    Adicionar imagem do Ativo
                  </div>
                )}
              </div>
              <div className="flex flex-col w-2/3 py-8 px-8">
                <span className="py-8 border-b border-gray150">
                  <h3 className="text-gray950 font-semibold text-base">
                    Tipo do Equipamento
                  </h3>
                  <p className="text-gray500 text-base">
                    {selectedItem.name.toLowerCase()}
                  </p>
                </span>
                <span className="py-8">
                  <h3 className="text-gray950 font-semibold text-base">
                    Responsável
                  </h3>
                  <p className="text-gray500 text-base">
                    {selectedItem.name.toLowerCase()}
                  </p>
                </span>
              </div>
            </section>
            <section className="w-full h-[120px] w-full p-8">
              <div className="w-full flex w-full justify-between items-center border-t border-gray150 py-8">
                <div className="w-1/2">
                  <h3 className="text-gray950 font-semibold text-base">
                    Sensor
                  </h3>
                  <p className="text-gray500 text-base">
                    {selectedItem.sensorId}
                  </p>
                </div>
                <div className="w-1/2">
                  <h3 className="text-gray950 font-semibold text-base">
                    Tipo do Equipamento
                  </h3>
                  <p className="text-gray500 text-base">
                    {selectedItem.sensorId}
                  </p>
                </div>
              </div>
            </section>
          </main>
        </>
      ) : (
        <></>
      )}
    </section>
  );
};

export default AssetView;
