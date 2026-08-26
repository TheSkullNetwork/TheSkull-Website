import ResourceCategoryLayout from "../components/ResourceCategoryLayout.jsx";
import { cyberCategories } from "../data/resourcesCyber.js";
import { useLiveResources } from "../hooks/useLiveResources.js";

export default function CybersecurityResources() {
  const categories = useLiveResources("cybersecurity", cyberCategories);

  return (
    <ResourceCategoryLayout
      title="Cybersecurity & Hacking"
      desc="Free-first, hands-on wherever possible. Pick a topic on the left — OSINT, web hacking, CTF practice, and more."
      accent="cyber"
      basePath="/resources/cybersecurity"
      categories={categories}
    />
  );
}
