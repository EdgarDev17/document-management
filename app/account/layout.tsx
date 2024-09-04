export default function SessionLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <section className="container mx-auto">{children}</section>;
}
