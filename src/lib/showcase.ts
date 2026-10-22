interface ShowcaseProject {
  id: string;
  data: {
    shortTitle: string;
    status: string;
    featured: boolean;
    example: boolean;
    displayOrder?: number;
    releases: { authorized: boolean }[];
  };
}
/** Completed projects take over once confirmed releases exist; until then show truthful catalog statuses. */
export function selectShowcase<T extends ShowcaseProject>(entries: T[]) {
  const completed = entries.filter(
    (project) =>
      project.data.status === 'Disponível' &&
      !project.data.example &&
      project.data.releases.some((release) => release.authorized),
  );
  const projects = [...(completed.length ? completed : entries)].sort(
    (a, b) =>
      (a.data.displayOrder ?? 100) - (b.data.displayOrder ?? 100) ||
      Number(b.data.featured) - Number(a.data.featured) ||
      a.data.shortTitle.localeCompare(b.data.shortTitle, 'pt-BR'),
  );
  return { projects, completedOnly: completed.length > 0 };
}
