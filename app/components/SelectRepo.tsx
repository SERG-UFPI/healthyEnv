import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

export default () => {

  const [isLoading, setIsLoading] = useState(true)
  const [repos, setRepos] = useState([])

  useEffect(() => {
    loadRepos()
  }, [])

  const loadRepos = async () => {
    const response = await axios.get('http://localhost:5000/repos')

    const reposItems = []
    response.data.forEach((element) => {
      reposItems.push(
        <a href='/analyze' style={{
          fontSize: 18,
          width: 'fit-content',
        }}>
          {element}
        </a>
      )
    });

    setIsLoading(false)
    setRepos([...reposItems])
  }

  return (
    <div style={{
      paddingLeft: '16px',
      paddingRight: '16px',
      paddingTop: '16px',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <span style={{
        fontSize: 30,
        fontWeight: 'bold',
        color: '#111111'
      }}>Analisar Repositório</span>
      <span style={{
        fontSize: 20,
        color: '#111111'
      }}>Faça a análise da saúde de um repositório baseando-se em repositórios semelhantes</span>
      <div style={{
        paddingTop: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <span style={{ fontWeight: 'bold', color: '#111111', fontSize: 20 }}>Selecione um repositório para continuar:</span>
        <div style={{
          position: 'relative',
        }}>
          <FontAwesomeIcon icon={faSearch} style={{
            color: '#757575',
            position: 'absolute',
            top: '50%',
            left: '2px',
            padding: '6px',
            transform: 'translateY(-50%)'
          }} />
          <input type="text" placeholder="Filtrar" style={{
            padding: '8px',
            paddingLeft: '30px',
            border: 'solid',
            borderColor: '#D8D8D8',
            borderWidth: '1px',
            borderRadius: '4px',
          }} />
        </div>
      </div>
      {
        isLoading
          ? <span>Carregando repositórios do dataset...</span>
          : <div style={{ display: 'flex', flexDirection: 'column' }}>
            {repos}
          </div>
      }
    </div>
  )
}