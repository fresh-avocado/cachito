import { choose } from "./choose";

// no es 1/6 porque el As es comodín
export const probOfPatoTrenCuadraChinaSamba = 1.0 / 3.0;
// con palo fijo no cuenta el As como comodín
export const probOfAsPatoTrenCuadraChinaSambaPaloFijo = 1.0 / 6.0;
// el As no tiene comodín
export const probOfAs = 1.0 / 6.0;

// N = what ur opponent guessed or what you guesses
// nTrials = number of dice on the table
// probOfSuccess = prob that 1 instance of the guess occurred

export const atLeastNSuccesses = ({ N, nTrials, probOfSuccess }: { N: number, nTrials: number, probOfSuccess: number }): string => {
  let prob = 0.0;
  for (let i = N; i <= nTrials; i++) {
    prob += choose(nTrials, i) * Math.pow(probOfSuccess, i) * Math.pow(1 - probOfSuccess, nTrials - i);
  }
  prob *= 100;
  return prob.toString().slice(0, 6);
};

export const calzar = ({ N, nTrials, probOfSuccess }: { N: number, nTrials: number, probOfSuccess: number }): string => {
  let prob = choose(nTrials, N) * Math.pow(probOfSuccess, N) * Math.pow(1 - probOfSuccess, nTrials - N);
  prob *= 100;
  return prob.toString().slice(0, 6);
};
