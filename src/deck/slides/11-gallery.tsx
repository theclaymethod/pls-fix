import { PhotoGridTemplate } from "@/templates";

export function Slide11Gallery() {
  return (
    <PhotoGridTemplate
      eyebrow="Portfolio"
      title="Featured Work"
      items={[
        {
          imageUrl: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&h=300&fit=crop",
          title: "Project Alpha",
          subtitle: "Brand identity",
        },
        {
          imageUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&h=300&fit=crop",
          title: "Project Beta",
          subtitle: "Web platform",
        },
        {
          imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
          title: "Project Gamma",
          subtitle: "Mobile app",
        },
        {
          imageUrl: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&h=300&fit=crop",
          title: "Project Delta",
          subtitle: "Marketing site",
        },
        {
          imageUrl: "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=400&h=300&fit=crop",
          title: "Project Epsilon",
          subtitle: "Dashboard",
        },
        {
          imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
          title: "Project Zeta",
          subtitle: "E-commerce",
        },
      ]}
      columns={3}
      variant="light"
    />
  );
}
