import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";

import { Button, KIND as ButtonKind, SIZE as ButtonSize } from "baseui/button";

import { Header } from "../components/Header";
import { Summary } from "../components/Summary";
import { NewTransactionModal } from "../components/NewTransactionModal";

// import { useTransactions } from "../context/useTransactions";
import { useAuth } from "../hook/useAuth";
import { useRouter } from "next/router";
import { useTransactions } from "../context/useTransactions";
import { TransactionRow } from "../components/TransactionRow";
import { TransactionFromDB } from "../types/types";

const Home: NextPage = () => {
  const router = useRouter();

  const { user } = useAuth();
  const { transactions, getTransactions } = useTransactions();

  getTransactions();

  const [newTransactionModalOpen, setNewTransactionModalOpen] = useState(false);

  function openNewTransactionModal(): void {
    setNewTransactionModalOpen(true);
  }

  function closeNewTransactionModal(): void {
    setNewTransactionModalOpen(false);
  }

  if (!user) {
    if (typeof window !== "undefined") {
      router.push("/login");
    }
  }

  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.tipoTransacao === "ENTRADA") {
        acc.deposits += transaction.valorTransacao;
        acc.total += transaction.valorTransacao;
      }
      if (transaction.tipoTransacao === "SAIDA") {
        acc.withdraws += transaction.valorTransacao;
        acc.total -= transaction.valorTransacao;
      }

      return acc;
    },
    {
      deposits: 0,
      withdraws: 0,
      total: 0,
    }
  );

  return (
    <>
      <Head>
        <title>OOMoney</title>
        <meta name="description" content="Transactions register app" />
        <link rel="icon" href="/salary.png" />
      </Head>

      <Header />

      <main className="mt-20 flex flex-col items-center">
        <section className="flex w-[65%] justify-between">
          <Summary title="Entradas" value={summary.deposits} type="deposit" />
          <Summary title="Sa??das" value={summary.withdraws} type="withdraw" />
          <Summary title="Total" value={summary.total} type="total" />
        </section>

        <section className="mt-8 flex h-10 w-[65%] justify-between">
          <div>
            <h2 className="text-2xl font-bold">Transa????es</h2>
            <p>{transactions.length} transa????es</p>
          </div>

          <div className="rounder border-1">
            <Button
              onClick={openNewTransactionModal}
            >
              Nova transa????o
            </Button>
          </div>

          <NewTransactionModal
            isOpen={newTransactionModalOpen}
            onClose={closeNewTransactionModal}
          />
        </section>

        <div className="mt-5 flex w-[60%] justify-center">
          <table className="w-full text-center">
            <thead>
              <tr>
                <th className="w-[35%] border-b-2 border-gray-300 px-6 py-3 text-sm uppercase leading-4 tracking-wider text-gray-500">
                  Descri????o
                </th>
                <th className="border-b-2 border-gray-300 px-6 py-3 text-sm uppercase leading-4 tracking-wider text-gray-500">
                  Valor
                </th>
                <th className="border-b-2 border-gray-300 px-6 py-3 text-sm uppercase leading-4 tracking-wider text-gray-500">
                  Tipo
                </th>
                <th className="border-b-2 border-gray-300 px-6 py-3 text-sm uppercase leading-4 tracking-wider text-gray-500">
                  Data
                </th>
                <th className="border-b-2 border-gray-300 px-6 py-3 text-sm uppercase leading-4 tracking-wider text-gray-500">
                  A????es
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr className="w-full" key={index}>
                  <TransactionRow transaction={transaction} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
};

export default Home;
