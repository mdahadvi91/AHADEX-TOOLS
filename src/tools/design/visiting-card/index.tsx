import { useEffect } from "react";
import { trackRecentTool } from "@lib/recentTools";
import { RelatedArticles } from "@components/blog/RelatedArticles";
import { ToolRelatedGuides } from "@components/tools/ToolRelatedGuides";
import { ToolDataSections } from "@components/tools/ToolDataSections";
import { ToolSchema } from "@components/seo/ToolSchema";
import { ToolBreadcrumb } from "@components/tools/ToolBreadcrumb";
import { RelatedToolsBlock } from "@components/tools/RelatedToolsBlock";
import { Gallery } from "./gallery";

export default function VisitingCardTool() {

  useEffect(() => {
    trackRecentTool({ path: "/tools/visiting-card", name: "Visiting Card", emoji: "🔧" });
  }, []);
  return (
    <>
      <ToolSchema toolId="visiting-card" />
      <Gallery />
      <div className="mx-auto max-w-[1400px] px-3 sm:px-6 lg:px-8">
        <ToolBreadcrumb
          toolName="Visiting Card Maker"
          category="Design Tools"
        />
        <RelatedToolsBlock currentToolId="visiting-card" count={3} />
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <ToolDataSections toolId="visiting-card" />
          <ToolRelatedGuides toolId="visiting-card" />
        <RelatedArticles toolId="visiting-card" />
        </div>
      </div>
    </>
  );
}
