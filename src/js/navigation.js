export function showSection(sectionId) {
  const sections = [
    ["search-filters-section", "meal-categories-section", "all-recipes-section"],
    "meal-details",
    "foodlog-section",
    "products-section"
  ];

  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];

    if (Array.isArray(section)) {
      const shouldShow = sectionId === "home";
      for (let j = 0; j < section.length; j++) {
        const el = document.getElementById(section[j]);
        if (el) el.style.display = shouldShow ? "block" : "none";
      }
    }
    else {
      const el = document.getElementById(section);
      if (el) el.style.display = section === sectionId ? "block" : "none";
    }
  }
}

