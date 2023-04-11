export const plural = (count, name) =>
  isPlural(count) ? `${count.length} ${name[1]}` : `1 ${name[0]}`;

export const isPlural = (count) => count.length > 1;
