const cache = new Map();

export const memo1 = (fn) => {
  if (cache.has(fn)) {
    return cache.get(fn)
  };
  const ret = fn()
  cache.set(fn, ret);

  return ret;
};

export const memo2 = (fn) => fn();
