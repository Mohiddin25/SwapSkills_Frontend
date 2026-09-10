// Formatters for Ivy Editorial layout

export function formatInitials(name = '') {
  if (!name) return 'SS';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return 'SS';
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function formatDate(dateString) {
  if (!dateString) return '';
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  } catch (e) {
    return dateString;
  }
}

export function formatPercentage(num) {
  return Math.round(num) + '%';
}
