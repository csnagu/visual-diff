import type { NextPage } from "next";
import Head from "next/head";
import Differ from "../components/differ";

const Home: NextPage = () => {
  return (
    <div className="p-8">
      <Head>
        <title>visual diff</title>
        <meta name="description" content="GUI based diff tool" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-6xl text-center m-5">visual diff</h1>
        <Differ />
      </main>

      <footer>
        Powered by{" "}
        <a href="https://github.com/kpdecker/jsdiff" target="_blank" rel="noopener noreferrer">
          jsdiff
        </a>
        {" and "}
        <a href="https://diff2html.xyz/" target="_blank" rel="noopener noreferrer">
          diff2html
        </a>
      </footer>
    </div>
  );
};

export default Home;
