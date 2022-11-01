import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";

import { Button, KIND as ButtonKind, SIZE as ButtonSize } from "baseui/button"

import { Header } from "../components/Header";
import { Summary } from "../components/Summary";
import { NewTransactionModal } from "../components/NewTransactionModal";

const Home: NextPage = () => {

  const [newTransactionModalOpen, setNewTransactionModalOpen] = useState(false);

  function openNewTransactionModal(): void {
    setNewTransactionModalOpen(true);
  }

  function closeNewTransactionModal():void {
    setNewTransactionModalOpen(false);
  }

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
          <Summary title="Entradas" value={2000} bgColor="bg-green-300" />
          <Summary title="Saídas" value={-1000} bgColor="bg-red-300" />
          <Summary title="Total" value={0} bgColor="bg-yellow-200" />
        </section>

        <section className="mt-2 flex justify-between w-[65%] h-10">
          <div>
            <h2 className="text-2xl font-bold">Transações</h2>
            <p>4 transações</p>
          </div>

          <Button
            onClick={openNewTransactionModal}
            kind={ButtonKind.primary}
            size={ButtonSize.compact}
          >
            Nova transação
          </Button>
          
          <NewTransactionModal isOpen={newTransactionModalOpen} onClose={closeNewTransactionModal}/>
        </section>
      </main>

    </>
  );
};

export default Home;
