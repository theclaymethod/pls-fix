import { TeamTemplate } from "@/templates";

export function Slide14Team() {
  return (
    <TeamTemplate
      eyebrow="The Team"
      title="Key Stakeholders"
      members={[
        { name: "Alex Chen", role: "Product Lead", initials: "AC" },
        { name: "Sarah Kim", role: "Engineering", initials: "SK" },
        { name: "Mike Davis", role: "Design", initials: "MD" },
        { name: "Emma Wilson", role: "Data Science", initials: "EW" },
      ]}
      columns={4}
      variant="light"
    />
  );
}
