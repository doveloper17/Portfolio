import PortfolioClient from "./PortfolioClient";
import { loadSiteContent } from "@/lib/content";

export default function Home() {
  const content = loadSiteContent();
  return <PortfolioClient content={content} />;
}
