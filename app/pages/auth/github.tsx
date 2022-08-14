import { useRouter } from "next/router";
import Head from "next/head";

export default function GitHub() {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Logging in...</title>
      </Head>
      <div>
        Received the code {router.query.code}. Next steps:
        <ul>
          <li>Request for a token using this code.</li>
          <li>Save locally (for a defined period of time) or on memory to make future requests to GitHub API</li>
          <li>Redirect to HealthyEnv dashboard with authenticated privileges</li>
        </ul>
      </div>
    </>
  );
}