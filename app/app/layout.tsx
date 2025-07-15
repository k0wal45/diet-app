import Navigation from "@/components/app/Navigation";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative flex">
      <Navigation />
      {children}
    </main>
  );
}
