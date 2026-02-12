import { motion } from "motion/react";
import {
  SlideContainer,
  Eyebrow,
  SectionHeader,
  MonoText,
  StaggerContainer,
  scaleInVariants,
} from "@/design-system";

const items = [
  { imageUrl: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&h=300&fit=crop", title: "Project Alpha", subtitle: "Brand identity" },
  { imageUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&h=300&fit=crop", title: "Project Beta", subtitle: "Web platform" },
  { imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop", title: "Project Gamma", subtitle: "Mobile app" },
  { imageUrl: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&h=300&fit=crop", title: "Project Delta", subtitle: "Marketing site" },
  { imageUrl: "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=400&h=300&fit=crop", title: "Project Epsilon", subtitle: "Dashboard" },
  { imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop", title: "Project Zeta", subtitle: "E-commerce" },
];

export function Slide11Gallery() {
  return (
    <SlideContainer mode="white">
      <div className="h-full flex flex-col">
        <div className="mb-6">
          <Eyebrow>Portfolio</Eyebrow>
          <SectionHeader className="mt-2" style={{ fontSize: "clamp(3rem, 5vw, 4rem)" }}>
            Featured Work
          </SectionHeader>
        </div>

        <StaggerContainer stagger={0.08} delay={0} className="flex-1 grid grid-cols-3 grid-rows-2 gap-4">
          {items.map((item, idx) => (
            <motion.div key={idx} className="h-full" variants={scaleInVariants}>
              <div className="relative h-full overflow-hidden group cursor-pointer">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url('${item.imageUrl}')` }}
                />
                <div className="absolute inset-0 bg-black/40 transition-colors duration-300 group-hover:bg-black/30" />
                <div className="absolute bottom-4 left-4 text-white">
                  <div
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "26px",
                    }}
                  >
                    {item.title}
                  </div>
                  <MonoText className="opacity-80" style={{ fontSize: "20px" }}>
                    {item.subtitle}
                  </MonoText>
                </div>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </SlideContainer>
  );
}
