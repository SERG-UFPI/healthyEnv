import MetricPlot from "./MetricPlot"

export default ({ repoInfo, clusteringInfo }) => {
  // TODO: fazer esses gráficos ficarem em um estilo de grid, observando o espaço disponível
  // TODO: criar um componente mais elegante para indicar o carregamento dos gráficos
  // TODO: alterar api para retornar um objeto dentro do objeto do repo para as métricas,
  // permitindo deixar a exibição delas dinâmica.
  return (
    <div>
      <MetricPlot
        y_all={clusteringInfo.map((repo: any) => { if (repo['near']) return repo['code_changes_commits'] })}
        y_selected={repoInfo['code_changes_commits']}
        labels={clusteringInfo.map((repo: any) => { if (repo['near']) return repo['name'] })}
        name={repoInfo['name']}
        title={'Code changes: commits'}
      />
      <MetricPlot
        y_all={clusteringInfo.map((repo: any) => { if (repo['near']) return repo['code_changes_lines_added'] })}
        y_selected={repoInfo['code_changes_lines_added']}
        labels={clusteringInfo.map((repo: any) => { if (repo['near']) return repo['name'] })}
        name={repoInfo['name']}
        title={'Code changes: lines added'}
      />
      <MetricPlot
        y_all={clusteringInfo.map((repo: any) => { if (repo['near']) return repo['code_changes_lines_removed'] })}
        y_selected={repoInfo['code_changes_lines_removed']}
        labels={clusteringInfo.map((repo: any) => { if (repo['near']) return repo['name'] })}
        name={repoInfo['name']}
        title={'Code changes: lines removed'}
      />
      <MetricPlot
        y_all={clusteringInfo.map((repo: any) => { if (repo['near']) return repo['code_changes_lines_avg_lines_commit'] })}
        y_selected={repoInfo['code_changes_lines_avg_lines_commit']}
        labels={clusteringInfo.map((repo: any) => { if (repo['near']) return repo['name'] })}
        name={repoInfo['name']}
        title={'Code changes: average lines per commit'}
      />
      <MetricPlot
        y_all={clusteringInfo.map((repo: any) => { if (repo['near']) return repo['code_changes_lines_avg_files_commit'] })}
        y_selected={repoInfo['code_changes_lines_avg_files_commit']}
        labels={clusteringInfo.map((repo: any) => { if (repo['near']) return repo['name'] })}
        name={repoInfo['name']}
        title={'Code changes: average files per commit'}
      />
    </div>
  )
}