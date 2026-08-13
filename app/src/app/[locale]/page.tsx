import { notFound } from "next/navigation";
import ResumePage from "@/components/ResumePage";
import { isLanguage } from "@/contexts/languageRouting";

export default async function LocalizedResumePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLanguage(locale)) {
    notFound();
  }

  return <ResumePage />;
}
