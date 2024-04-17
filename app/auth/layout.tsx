'use client';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='login wrapper flex min-h-screen flex-col justify-between bg-gray-900'>
      {children}
    </div>
  );
}
