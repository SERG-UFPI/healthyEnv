export default (
  { language,
    size,
    stars,
    forks,
    openIssues,
    devs,
    commits,
    files, }
) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row'
    }}>
      <RepoInfosItem title='Linguagem' content={language} />
      <RepoInfosItem title='Tamanho' content={size} />
      <RepoInfosItem title='Estrelas' content={stars} />
      <RepoInfosItem title='Forks' content={forks} />
      <RepoInfosItem title='Issues abertas' content={openIssues} />
      <RepoInfosItem title='Devs' content={devs} />
      <RepoInfosItem title='Commits' content={commits} />
      <RepoInfosItem title='Arquivos' content={files} />
    </div>
  )

}

const RepoInfosItem = ({ title, content }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: '8px',
      paddingRight: '20px',
    }}>
      <span style={{
        fontSize: 12,
      }}>{title}</span>
      <span style={{
        fontSize: 22,
      }}>{content}</span>
    </div>
  )
}