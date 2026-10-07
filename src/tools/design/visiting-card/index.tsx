import { RecommendedProducts } from "@components/affiliate/RecommendedProducts";
import { RelatedArticles } from "@components/blog/RelatedArticles";
import { ToolSchema } from "@components/seo/ToolSchema";
import { ToolBreadcrumb } from "@components/tools/ToolBreadcrumb";
import { RelatedToolsBlock } from "@components/tools/RelatedToolsBlock";
import { Gallery } from "./gallery";

export default function VisitingCardTool() {
  return (
    <>
      <ToolSchema toolId="visiting-card" />
      <Gallery />
      <div className="mx-auto max-w-[1400px] px-3 sm:px-6 lg:px-8">
        <ToolBreadcrumb
          toolName="Visiting Card Maker"
          category="Design Tools"
        />
        <RecommendedProducts toolId="visiting-card" />
        <RelatedToolsBlock currentToolId="visiting-card" count={3} />
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <RelatedArticles toolId="visiting-card" />
        </div>
      </div>
    </>
  );
}
