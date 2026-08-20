import Navbar from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Services } from "@/components/sections/services/services";

export default function ServicesPage() {
  return (
    <>
      <Navbar variant="default" />
      <main>
        <Services />
      </main>
      <Footer variant="dark" />
    </>
  );
}
