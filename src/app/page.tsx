import ExtraServicesSection from "@/component/ExtraServicesSection";
import FlightSearch from "@/component/FlightSearch";
import Layout from "@/component/ui/layout";
import Image from "next/image";

export default function Home() {
  return (
    <Layout>
      <FlightSearch></FlightSearch>
      <ExtraServicesSection></ExtraServicesSection>
    </Layout>
  );
}
