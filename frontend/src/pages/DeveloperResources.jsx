import ResourceCategoryLayout from "../components/ResourceCategoryLayout.jsx";
import { devCategories } from "../data/resourcesDev.js";
import { useLiveResources } from "../hooks/useLiveResources.js";

export default function DeveloperResources() {
  const categories = useLiveResources("developers", devCategories);

  return (
    <ResourceCategoryLayout
      title="Developer Resources"
      desc="Learning platforms, practice sites, everyday tools, and Discord bot dev references. Pick a topic on the left."
      accent="dev"
      basePath="/resources/developers"
      categories={categories}
    />
  );
}
