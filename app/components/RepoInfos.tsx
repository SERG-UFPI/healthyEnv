const RepoInfos = (
  { language,
    loc,
    stars,
    forks,
    openIssues,
    devs,
    commits, }
) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row'
    }}>
      <RepoInfosItem title='Linguagem' content={language} />
      <RepoInfosItem title='LOC' content={loc} />
      <RepoInfosItem title='Estrelas' content={stars} />
      <RepoInfosItem title='Forks' content={forks} />
      <RepoInfosItem title='Issues abertas' content={openIssues} />
      <RepoInfosItem title='Devs' content={devs} />
      <RepoInfosItem title='Commits' content={commits} />
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

export default RepoInfos