export const fact = (n: number): number => {
  let fact = 1;
  for (let i = 1; i <= n; i++) {
    fact *= i;
  }
  return fact;
};

export const choose = (n: number, k: number): number => {
  return fact(n) / (fact(k) * fact(n - k));
};
