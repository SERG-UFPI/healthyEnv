interface RepoInfosProps {
  language: string
  loc: string
  stars: string
  forks: string
  openIssues: string
  contributors: string
  commits: string
}

const RepoInfos = (props: RepoInfosProps) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    }}>
      <RepoInfosItem title='Linguagem' content={props.language} />
      <RepoInfosItem title='LOC' content={props.loc} />
      <RepoInfosItem title='Estrelas' content={props.stars} />
      <RepoInfosItem title='Forks' content={props.forks} />
      <RepoInfosItem title='Issues abertas' content={props.openIssues} />
      <RepoInfosItem title='Contribuidores' content={props.contributors} />
      <RepoInfosItem title='Commits' content={props.commits} />
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