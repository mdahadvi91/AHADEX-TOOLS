import { RecommendedProducts } from "@components/affiliate/RecommendedProducts";
import { Gallery } from "./gallery";
import { RelatedArticles } from "@components/blog/RelatedArticles";

export default function VisitingCardTool() {
  return (
    <>
      <Gallery />
      <div className="mx-auto max-w-[1400px] px-3 sm:px-6 lg:px-8">
        <RecommendedProducts toolId="visiting-card" />
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <RelatedArticles toolId="visiting-card" />
        </div>
      </div>
    </>
  );
}
