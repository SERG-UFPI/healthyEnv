import Head from "next/head"
import Header from "../components/Header";

const Docs = () => {
  return (
    <>
      <Head>
        <title>HealthyEnv - Sobre</title>
      </Head>
      <Header selectedIndex={3} />
      <div>
        {'(Landing)'}
        Docs
      </div>
    </>
  );
}

export default Docs;