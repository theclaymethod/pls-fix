import { createFileRoute } from "@tanstack/react-router";
import { BuilderLayout } from "@/builder/components/builder-layout";

export const Route = createFileRoute("/builder/")({
  component: BuilderPage,
});

function BuilderPage() {
  return <BuilderLayout />;
}
