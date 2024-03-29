import Router, { useRouter } from "next/router";
import Head from "next/head";
import { useEffect } from "react";
import axios from "axios";
import { Dots } from 'react-activity'
import "react-activity/dist/Dots.css";
import Constants from "../../utils/constants";

export default function GitHub() {
  const router = useRouter()

  // useEffect(() => {
  //   requestGitHubToken()
  // }, [])

  useEffect(() => {
    if (!router.isReady) return
    requestGitHubToken()
  }, [router.isReady])

  async function requestGitHubToken() {
    const code = router.query.code

    // Autentica o usuário para obter token
    const response = await axios.get(`${Constants.baseUrl}/auth/github_token?code=${code}`)

    // TODO: verifica se obteve o token com sucesso para continuar os passos seguintes
    const userDataRes = await axios.get(`https://api.github.com/user`, {
      headers: {
        'Accept': 'application/vnd.github+json',
        'Authorization': `token ${response.data.access_token}`
      }
    })
    // TODO: verifica se os dados do usuário logado foram obtidos com sucesso antes de continuar
    saveUserInfo('userData', JSON.stringify({
      'token': response.data.access_token,
      'login': userDataRes.data.login,
      'name': userDataRes.data.name,
      'email': userDataRes.data.email,
      'profilePicture': userDataRes.data.avatar_url,
      'timestamp': Date.now(),
    }))

    const path = router.query.next == 'undefined' || undefined
      ? '/dashboard/datasets'
      : `${router.query.next}`

    Router.push(path)
  }

  function saveUserInfo(key: string, value: string) {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, value)
    }
  }

  return (
    <>
      <Head>
        <title>Please wait</title>
      </Head>
      <div style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Dots color='#000000' size={18} speed={1} animating={true} />
        <span>Please wait...</span>
      </div>
    </>
  );
}