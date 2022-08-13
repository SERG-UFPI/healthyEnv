import Head from "next/head"
import Header from "../components/Header";

const ApiDocs = () => {
  return (
    <>
      <Head>
        <title>HealthyEnv - Sobre</title>
      </Head>
      <Header selectedIndex={2} />
      <div>
        {'(Landing)'}
        API
      </div>
    </>
  );
}

export default ApiDocs;