import { createFileRoute, redirect } from "@tanstack/react-router";
import { DeckLayout } from "@/core";
import { getSlideComponent, SLIDES_NAV, TOTAL_SLIDES } from "@/deck/config";

export const Route = createFileRoute("/deck/$slide")({
  component: SlideRoute,
  beforeLoad: ({ params }) => {
    const slideNum = parseInt(params.slide, 10);
    if (isNaN(slideNum) || slideNum < 1 || slideNum > TOTAL_SLIDES) {
      throw redirect({ to: "/deck/$slide", params: { slide: "1" } });
    }
  },
});

function SlideRoute() {
  const { slide } = Route.useParams();
  const currentSlide = parseInt(slide, 10);
  const SlideComponent = getSlideComponent(currentSlide);

  return (
    <DeckLayout currentSlide={currentSlide} slides={SLIDES_NAV}>
      <SlideComponent />
    </DeckLayout>
  );
}
