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
        <a href={'/analyze/' + element['name'].split('/')[0] + '%2F' + element['name'].split('/')[1]} style={{
          fontSize: 18,
          width: 'fit-content',
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            paddingBottom: '10px'
          }}>
            <span style={{
              fontWeight: 'bold',
            }}>{element['name']}</span>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              paddingTop: '4px',
            }}>
              <Chip label={element['language']} />
              <Chip label={element['size'] + ' de tamanho'} />
              <Chip label={element['stars'] + ' estrelas'} />
              <Chip label={element['forks'] + ' forks'} />
              <Chip label={element['open_issues'] + ' issues abertas'} />
              <Chip label={element['devs'] + ' devs'} />
              <Chip label={element['commits'] + ' commits'} />
              <Chip label={element['files'] + ' arquivos'} />
            </div>
          </div>
        </a >
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
        <span style={{ fontWeight: 'bold', color: '#111111', fontSize: 22, paddingBottom: '10px' }}>Selecione um repositório para continuar:</span>
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

const Chip = ({ label }) => {
  return (
    <div style={{
      marginRight: '10px',
      backgroundColor: '#EAEAEA',
      padding: '4px 10px',
      borderRadius: '20px',
      fontSize: 14
    }}>
      {label}
    </div>
  )
}