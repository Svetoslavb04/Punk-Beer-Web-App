export const hash = (val: any) =>
  crypto.subtle.digest('SHA-256', new TextEncoder().encode(JSON.stringify(val))).then(h => {
    const hexes = [];
    const view = new DataView(h);
    for (let i = 0; i < view.byteLength; i += 4)
      hexes.push(('00000000' + view.getUint32(i).toString(16)).slice(-8));
    return hexes.join('');
  });

export const hashAll = async (val: any[]) => {
  const allHashesPromises = val.map(async e => await hash(e));

  return Promise.all(allHashesPromises);
};
