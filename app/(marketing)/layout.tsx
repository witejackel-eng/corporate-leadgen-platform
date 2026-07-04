import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { getHeaderNavLinks } from "@/server/queries/navigation";

export default async function MarketingLayout({ children }: { children: React.ReactNode }) {
  const navLinks = await getHeaderNavLinks();

  return (
    <>
      <Navbar navLinks={navLinks} />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
