export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <main className=" bg-slate-50" >
        {children}
      </main>
    );
  }
  