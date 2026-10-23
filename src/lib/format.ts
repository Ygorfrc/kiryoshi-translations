export function formatDate(date?: Date): string {
  return date
    ? new Intl.DateTimeFormat('pt-BR', {
        dateStyle: 'long',
        timeZone: 'UTC',
      }).format(date)
    : 'Não informado';
}
export function formatPercent(value: number): string {
  return `${new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 }).format(value)}%`;
}
export function formatBytes(bytes: number): string {
  return bytes < 1048576
    ? `${(bytes / 1024).toFixed(1)} KB`
    : `${(bytes / 1048576).toFixed(1)} MB`;
}
export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
