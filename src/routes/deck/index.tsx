import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/deck/")({
  beforeLoad: () => {
    throw redirect({ to: "/deck/$slide", params: { slide: "1" } });
  },
  component: () => null,
});
