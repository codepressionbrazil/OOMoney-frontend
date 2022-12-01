import { DatePicker } from "baseui/datepicker";
import { FormControl } from "baseui/form-control";
import type { NextPage } from "next";
import { useState } from "react";
import { Header } from "../components/Header";

import locale from "date-fns/locale/pt-BR";
import { useTransactions } from "../context/useTransactions";
import { TransactionFromDB } from "../types/types";
import { Summary } from "../components/Summary";

const ResumoPage: NextPage = () => {
  const [initDate, setInitDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const [incomeTotal, setIncomeTotal] = useState(0);
  const [outcomeTotal, setOutcomeTotal] = useState(0);
  const [balance, setBalance] = useState(0);

  const [filteredTransactions, setFilteredTransactions] =
    useState<TransactionFromDB[]>();

  const { transactions } = useTransactions();

  async function handleGenerateSummary() {
    // if (!new Date(initDate!) && !new Date(endDate!)) setFilteredTransactions(transactions)

    const transactionFiltered = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.dataHora);

      if (!endDate!) {
        return (
          new Date(transactionDate).toDateString() >= new Date(initDate!).toDateString() &&
          new Date(transactionDate).toDateString() <= new Date().toDateString()
        );
      }

      return (
        new Date(transactionDate).toDateString() >= new Date(initDate!).toDateString() &&
        new Date(transactionDate).toDateString() <= new Date(endDate!).toDateString()
      );
    });

    console.log(transactionFiltered)

    const amountTotals = transactionFiltered.reduce(
      (acc, transaction) => {
        if (transaction.tipoTransacao === "ENTRADA") {
          acc.income += transaction.valorTransacao;
          acc.total += transaction.valorTransacao;
        }
        if (transaction.tipoTransacao === "SAIDA") {
          acc.outcome += transaction.valorTransacao;
          acc.total -= transaction.valorTransacao;
        }

        return acc;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      }
    );

    setIncomeTotal(amountTotals.income);
    setOutcomeTotal(amountTotals.outcome);
    setBalance(amountTotals.total);

    setFilteredTransactions(transactionFiltered);
  }

  return (
    <>
      <Header />

      <main className="mx-auto flex flex-col items-center justify-center">
        <h1 className="py-2 text-2xl">Resumo</h1>
        <div className="mt-4">
          <FormControl label="Data Inicial">
            <DatePicker
              value={initDate}
              onChange={({ date }) => setInitDate(date as Date)}
              formatString="dd/MM/yyyy"
              placeholder="dd/MM/yyyy"
              locale={locale}
            />
          </FormControl>
        </div>
        <div className="mb-4">
          <FormControl label="Data Final">
            <DatePicker
              value={endDate}
              onChange={({ date }) => setEndDate(date as Date)}
              formatString="dd/MM/yyyy"
              placeholder="dd/MM/yyyy"
              locale={locale}
            />
          </FormControl>
        </div>

        <div>
          <button
            className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
            onClick={handleGenerateSummary}
          >
            Gerar Relatório
          </button>
        </div>

        {filteredTransactions && (
          <div className="mt-10 flex w-full flex-col items-center justify-center">
            <section className="flex w-[65%] justify-between">
              <Summary title="Entradas" value={incomeTotal} type="deposit" />
              <Summary title="Saídas" value={outcomeTotal} type="withdraw" />
              <Summary title="Total" value={balance} type="total" />
            </section>

            <section className="mt-10 w-[65%]">
              {filteredTransactions.length ? (
                <table className="w-full text-center">
                  <thead>
                    <tr>
                      <th className="border border-gray-300 p-2">Data</th>
                      <th className="border border-gray-300 p-2">Descrição</th>
                      <th className="border border-gray-300 p-2">Valor</th>
                      <th className="border border-gray-300 p-2">Tipo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTransactions.map((transaction) => (
                      <tr key={transaction.id}>
                        <td className="border border-gray-300 p-2">
                          {new Date(transaction.dataHora).toLocaleDateString()}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {transaction.descricao}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {transaction.valorTransacao}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {transaction.tipoTransacao}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <h1 className="text-2xl">Nenhuma transação encontrada</h1>
                </div>
              )}
            </section>
          </div>
        )}
      </main>
    </>
  );
};

export default ResumoPage;
