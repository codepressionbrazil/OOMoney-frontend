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

      <main className="mt-20">
        <section className="flex w-full justify-center">
          <Summary title="Entradas" value={2000} />
          <Summary title="Saídas" value={1000} />
          <Summary title="Total" value={1000} />
        </section>
      </main>
    </>
  );
};

export default Home;
