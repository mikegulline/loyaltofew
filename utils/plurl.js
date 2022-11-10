export const plurl = (count, name) =>
  isPlurl(count) ? `${count.length} ${name[1]}` : `1 ${name[0]}`;

export const isPlurl = (count) => count.length > 1;
