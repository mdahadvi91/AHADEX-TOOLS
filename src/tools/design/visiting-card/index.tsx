import { RecommendedProducts } from "@components/affiliate/RecommendedProducts";
import { Gallery } from "./gallery";

export default function VisitingCardTool() {
  return (
    <>
      <Gallery />
      <div className="mx-auto max-w-[1400px] px-3 sm:px-6 lg:px-8">
        <RecommendedProducts toolId="visiting-card" />
      </div>
    </>
  );
}
