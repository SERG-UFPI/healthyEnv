import Head from "next/head"
import Header from "../components/Header";

const HowItWorks = () => {
  return (
    <>
      <Head>
        <title>HealthyEnv - Sobre</title>
      </Head>
      <Header selectedIndex={1} />
      <div>
        {'(Landing)'}
        How it works
      </div>
    </>
  );
}

export default HowItWorks;