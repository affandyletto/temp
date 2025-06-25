// src/utils/breadcrumb.js

export function generateBreadcrumb(pathname, getLabelById) {
  const segments = pathname.split("/").filter(Boolean);
  const parents = ["projects", "clients"];

  const items = [{ label: "Home", path: null }];

  let currentPath = "";

  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;

    const isLast = index === segments.length - 1;
    const isId = /^\d+$/.test(segment);
    const isUUID =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        segment
      );
    const isPreviousProjects = parents.includes(segments[index - 1]);

    let label = segment;

    if (isLast && (isId || isUUID) && isPreviousProjects && getLabelById) {
      console.log("segment", segment);
      const dataLabel = getLabelById(segment);
      label = dataLabel || `ID ${segment}`;
    } else {
      label = segment
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
    }

    items.push({
      label,
      path: isLast ? null : currentPath,
    });
  });

  return items;
}
