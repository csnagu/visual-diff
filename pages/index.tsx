import type { NextPage } from "next";
import Head from "next/head";
import Differ from "../components/differ";

const Home: NextPage = () => {
  return (
    <div className="p-8">
      <Head>
        <title>eye diff</title>
        <meta name="description" content="GUI based diff tool" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-6xl text-center m-5">👀-diff</h1>
        <Differ />
      </main>

      <footer className="mt-2 pt-2 border-t">
      </footer>
    </div>
  );
};

export default Home;
