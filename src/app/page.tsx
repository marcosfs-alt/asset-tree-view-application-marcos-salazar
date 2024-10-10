import Companies from '@/components/Header/Companies';

export default function Home() {
  return (
    <div className="w-full h-full flex justify-center flex-col items-center gap-2">
      <div className="text-lg text-bold text-black">
        selecione uma empresa para ver seus ativos
      </div>
      <Companies />
    </div>
  );
}
