const UnionFind = (size) => {
  const parent = Array.from({ length: size }, (_, i) => i);

  const find = (i) => {
    if (parent[i] === i) {
        return i;
    }
    return find(parent[i]);
  };
  const unite = (i, j) => {
    const parentI = find(i);
    const parentJ = find(j);
    if (parentI == parentJ) {
        return;
    }
    parent[parentI] = parent[parentJ];
  }
  return {
    unite,
    find
  };
};

/*
1 2
3 4
2 3
0 2 2 4 4

0 1 1 3 4
0 1 1 3 4

*/