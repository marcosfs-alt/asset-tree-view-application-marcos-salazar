import type { Metadata } from 'next';
import './globals.css';
import Logo from '@/../public/assets/icons/logo.svg';

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
        <header className="bg-tracBlue h-[48px] static lg:fixed w-screen">
          <div className="px-14 py-[17px]">
            <Logo width={102} height={14} />
          </div>
        </header>
        <main>{children}</main>
        <footer></footer>
      </body>
    </html>
  );
}
