import type { NextPage } from "next";
import Head from "next/head";

import { Header } from "../components/Header";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>OOMoney</title>
        <meta name="description" content="Transactions register app" />
        <link rel="icon" href="/salary.png" />
      </Head>

      <Header />

      <main className="grid min-h-screen place-items-center text-center">
        <div>
          <h2>Wellcome to OOMoney</h2>
          <p>A object oriented transactions register.</p>
          <p>Our main goal is to make yout money control easier!</p>
        </div>
      </main>

    </>
  );
};

export default Home;
