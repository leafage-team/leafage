export const findResourcePreset = (ctx) => {
  const map = new Map();

  ctx.findResource = (id) => {
    if (!id) return null;
    if (map.has(id)) return map.get(id);

    const res = ctx.resources.find((row) => row.view === id);

    if (res) {
      map.set(id, res);

      return res;
    }

    return null;
  };
};
