import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import {
  atLeastNSuccesses,
  calzar,
  probOfAs,
  probOfAsPatoTrenCuadraChinaSambaPaloFijo,
  probOfPatoTrenCuadraChinaSamba,
} from "../utils/probability/probs";

const getProb = (type: number, paloFijo: boolean): number => {
  if (paloFijo) {
    return probOfAsPatoTrenCuadraChinaSambaPaloFijo;
  } else {
    if (type === 1) {
      return probOfAs;
    } else {
      return probOfPatoTrenCuadraChinaSamba;
    }
  }
};

const Home: NextPage = () => {
  // general info
  const [type, setType] = useState(1);
  const [quantity, setQuantity] = useState(12);
  const [dies, setDies] = useState(45);
  const [paloFijo, setPaloFijo] = useState(false);

  // probabilities
  const [atLeastProb, setAtLeastProb] = useState("0");
  const [atLeastPlusOneProb, setAtLeastPlusOneProb] = useState("0");
  const [exactProb, setExactProb] = useState("0");
  const [asesProb, setAsesProb] = useState("1");
  const [noAsesProb, setNoAsesProb] = useState("1");

  // alternatives
  const [ases, setAses] = useState(1);
  const [noAses, setNoAses] = useState(1);

  useEffect(() => {
    // TODO: si es palo fijo, solo puedo subir, ya no tengo la alternativa
    if (type !== 1) {
      const newVal1 = Math.floor(quantity / 2) + 1;
      setAses(newVal1);
      setAsesProb(
        atLeastNSuccesses({
          N: newVal1,
          nTrials: dies,
          probOfSuccess: getProb(1, paloFijo),
        })
      );
    } else {
      const newVal2 = quantity * 2 + 1;
      setNoAses(newVal2);
      setNoAsesProb(
        atLeastNSuccesses({
          N: newVal2,
          nTrials: dies,
          probOfSuccess: getProb(2, paloFijo),
        })
      );
    }
    setAtLeastProb(
      atLeastNSuccesses({
        N: quantity,
        nTrials: dies,
        probOfSuccess: getProb(type, paloFijo),
      })
    );
    setAtLeastPlusOneProb(
      quantity + 1 <= dies
        ? atLeastNSuccesses({
            N: quantity + 1,
            nTrials: dies,
            probOfSuccess: getProb(type, paloFijo),
          })
        : "0"
    );
    setExactProb(
      calzar({
        N: quantity,
        nTrials: dies,
        probOfSuccess: getProb(type, paloFijo),
      })
    );
  }, [type, quantity, dies, paloFijo]);

  return (
    <div className="w-full h-full p-4 dark:bg-slate-800 dark:text-white max-[430px]:text-xs">
      <Head>
        <title>Calculadora Cachito</title>
        <meta
          name="description"
          content="Calcula tus probabilidades de ganar en cachito."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full h-full flex flex-col items-center text-center">
        <h1 className="text-5xl text-center rounded-lg bg-indigo-600 p-3 shadow-indigo-500/50">
          Gana en Cachito
        </h1>
        <div className="w-full max-w-xl flex flex-col gap-6 items-center p-4 rounded-lg shadow-xl dark:shadow-custom m-5 text-start">
          <h2 className="text-3xl text-red-500">Info General</h2>
          <div className="w-full h-8 flex justify-between">
            <div className="flex justify-center items-center font-bold">
              ¿Palo Fijo?:{" "}
            </div>
            <select
              value={paloFijo ? "true" : "false"}
              onChange={(e) =>
                e.target.value === "true"
                  ? setPaloFijo(true)
                  : setPaloFijo(false)
              }
              className="border-b-2 border-b-red-600 outline-none dark:bg-slate-800"
            >
              <option value="true">Sí</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="w-full h-8 flex justify-between">
            <div className="flex justify-center items-center font-bold">
              Dados en juego:
            </div>
            <input
              className="border-b-2 border-b-red-600 outline-none dark:bg-slate-800"
              type="number"
              min={1}
              max={99}
              value={dies}
              onChange={(e) => setDies(+e.target.value)}
            />
          </div>
          <div className="w-full h-8 flex justify-between">
            <div className="flex justify-center items-center font-bold">
              Lo que te dijo el jugador anterior:
            </div>
            <div className="flex gap-1">
              <input
                className="border-b-2 border-b-red-600 outline-none dark:bg-slate-800"
                type="number"
                min={1}
                max={99}
                value={quantity}
                onChange={(e) => setQuantity(+e.target.value)}
              />
              <select
                className="w-32 border-b-2 border-b-red-600 outline-none dark:bg-slate-800"
                value={`${type}`}
                onChange={(e) => setType(+e.target.value)}
              >
                <option value="1">Ases (1)</option>
                <option value="2">Patos (2)</option>
                <option value="3">Trenes (3)</option>
                <option value="4">Cuadras (4)</option>
                <option value="5">Quinas o Chinas (5)</option>
                <option value="6">Sambas (6)</option>
              </select>
            </div>
          </div>
        </div>
        <div className="w-full max-w-xl h-fit flex flex-col gap-6 items-center p-4 rounded-lg shadow-xl dark:shadow-custom m-5 text-start">
          <h2 className="text-3xl text-green-500 text-center">
            Probabilidades de Éxito
          </h2>
          <div className="w-full h-8 flex justify-between">
            <div className="flex justify-center items-center font-bold">
              Dudar:
            </div>
            <div className="flex justify-center items-center whitespace-nowrap">
              {(100 - +atLeastProb).toString().slice(0, 6)} %
            </div>
          </div>
          <div className="w-full h-8 flex justify-between">
            <div className="flex justify-center items-center font-bold">
              Mínimo {quantity + 1}{" "}
              {type === 1 ? "Ases" : "patos, trenes, cuadras, quinas o sambas"}:
            </div>
            <div className="flex justify-center items-center whitespace-nowrap">
              {atLeastPlusOneProb} %
            </div>
          </div>
          <div className="w-full h-8 flex justify-between">
            <div className="flex justify-center items-center font-bold">
              Calzar:
            </div>
            <div className="flex justify-center items-center whitespace-nowrap">
              {exactProb} %
            </div>
          </div>
          {/* si no es un As, podemos cambiarlo a As */}
          {type !== 1 && (
            <div className="w-full h-8 flex justify-between">
              <div className="flex justify-center items-center font-bold">
                Mínimo {ases} Ases:
              </div>
              <div className="flex justify-center items-center whitespace-nowrap">
                {asesProb} %
              </div>
            </div>
          )}
          {/* si es un As, podemos cambiarlo a otro */}
          {type === 1 && (
            <div className="w-full h-8 flex justify-between">
              <div className="flex justify-center items-center font-bold">
                Mínimo {noAses} patos, trener, cuadras, quinas o sambas:
              </div>
              <div className="flex justify-center items-center whitespace-nowrap">
                {noAsesProb} %
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="flex flex-col justify-center items-center">
        <div>Página hecha por:</div>
        <a
          className="text-indigo-700 font-bold hover:underline hover:decoration-solid"
          href="https://www.linkedin.com/in/gabriel-spranger/"
          target="_blank"
        >
          Gabriel Spranger Rojas
        </a>
      </footer>
    </div>
  );
};

export default Home;
