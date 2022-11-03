import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";

import { Button, KIND as ButtonKind, SIZE as ButtonSize } from "baseui/button"

import { Header } from "../components/Header";
import { Summary } from "../components/Summary";
import { NewTransactionModal } from "../components/NewTransactionModal";

// import { useTransactions } from "../context/useTransactions";
import { useAuth } from "../hook/useAuth";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter()

  // const {} = useTransactions()
  const { user } = useAuth()

  const [newTransactionModalOpen, setNewTransactionModalOpen] = useState(false);

  function openNewTransactionModal():void {
    setNewTransactionModalOpen(true);
  }

  function closeNewTransactionModal():void {
    setNewTransactionModalOpen(false);
  }

  console.log(user)

  if(!user) {
    if(typeof window !== 'undefined') {
      router.push('/login')
    }
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
          <Summary title="Entradas" value={2000} type="deposit" />
          <Summary title="Saídas" value={-1000} type="withdraw" />
          <Summary title="Total" value={0} type="total" />
        </section>

        <section className="mt-8 flex justify-between w-[65%] h-10">
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
