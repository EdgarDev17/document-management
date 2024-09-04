import { NewConferenceStoreProvider } from "@/lib/providers/conference-form-provider";

export default function EventLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <NewConferenceStoreProvider>{children}</NewConferenceStoreProvider>
    </section>
  );
}
