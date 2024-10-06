import type { Metadata } from 'next';
import './globals.css';
import Logo from '@/../public/assets/icons/logo.svg';
import Companies from '@/components/Header/Companies';

export const metadata: Metadata = {
  title: 'Tractian - Tree View',
  description: 'Tree View Application for Companies Assets',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="bg-tracBlue h-[48px] w-full">
          <div className="px-4 h-full flex items-center justify-between">
            <Logo width={102} height={14} />
            <Companies />
          </div>
        </header>
        <main>{children}</main>
        <footer></footer>
      </body>
    </html>
  );
}
