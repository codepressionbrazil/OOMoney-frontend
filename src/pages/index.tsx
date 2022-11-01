import type { NextPage } from "next";
import Head from "next/head";

import { Header } from "../components/Header";
import { Summary } from "../components/Summary";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>OOMoney</title>
        <meta name="description" content="Transactions register app" />
        <link rel="icon" href="/salary.png" />
      </Head>

      <Header />

      <main className="mt-20 flex justify-center">
        <section className="flex w-[65%] justify-between">
          <Summary title="Entradas" value={2000} bgColor="bg-green-300" />
          <Summary title="Saídas" value={-1000} bgColor="bg-red-300" />
          <Summary title="Total" value={0} bgColor="bg-yellow-200" />
        </section>

        <section>
          <div>
            <h2 className="text-2xl font-bold">Transações</h2>
            <p>4 transações</p>
          </div>

          
        </section>
      </main>

    </>
  );
};

export default Home;
