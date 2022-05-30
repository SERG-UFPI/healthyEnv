import json
import math
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from model.metric_repo import MetricRepoModel


def _pre_processing(repos):
  repos_data = []
  for repo in repos:
    repos_data.append([repo.loc, repo.stars, repo.forks, repo.open_issues, repo.contributors, repo.commits])
  
  # Aplicando Scaler
  scaler = StandardScaler()
  repos_data = scaler.fit_transform(repos_data)

  # Aplicando PCA
  pca = PCA(n_components=2)
  repos_data = pca.fit_transform(repos_data)
  
  return repos_data


def _calc_distances(repos, data, selected_repo_name, n):
  # Pegando o index do repositório selecionado
  selected_repo_index = 0
  for index, repo in enumerate(repos):
    if repo.name == selected_repo_name:
      selected_repo_index = index
      break  

  # Separando o repositório selecionado para continuar o algoritmo
  selected_repo = repos[selected_repo_index]
  selected_repo_data = data[selected_repo_index]
  repos.pop(selected_repo_index)
  data = data.tolist()
  data.pop(selected_repo_index)

  distances = []
  for index, repo_data in enumerate(data):
    distance = math.sqrt((repo_data[0] - selected_repo_data[0]) ** 2 + (repo_data[1] - selected_repo_data[1]) ** 2)
    distances.append({
      'id': repos[index].id,
      'name': repos[index].name,
      'distance': distance,
      'x': repo_data[0],
      'y': repo_data[1]})
  
  # Ordenar os valores em ordem crescente por distância
  distances = sorted(distances, key=lambda d: d['distance'])
  
  # Adicionar atributo para indicar se é próximo ou distante
  for index, distance in enumerate(distances):
    if (index < n):
      distance['near'] = True
    else:
      distance['near'] = False
  
  # Montar objeto para representar o repositório selecionado
  selected_repo_output = {
    'id': selected_repo.id,
    'name': selected_repo.name,
    'language': selected_repo.language,
    'loc': selected_repo.loc,
    'stars': selected_repo.stars,
    'forks': selected_repo.forks,
    'open_issues': selected_repo.open_issues,
    'contributors': selected_repo.contributors,
    'commits': selected_repo.commits,
    'x': selected_repo_data[0],
    'y': selected_repo_data[1],
  }
  
  return [selected_repo_output, distances]


def _save_results(selected_repo, other_repos):
  # Montagem do dicionário completo que será o JSON com todas as informações
  repos_ids = []
  repos_ids.append(selected_repo['id'])
  for repo in other_repos:
    if repo['near'] == True:
      repos_ids.append(repo['id'])

  metrics_list_from_repos = MetricRepoModel.get_repos_metrics(repos_ids)

  # Create a dict to separate metrics by repository
  metrics_dict = {}
  for id in repos_ids: # Create repo key with empty values
    metrics_dict[id] = {}
  for repo_metrics in metrics_list_from_repos: # Add metrics for each repo
    metrics_dict[repo_metrics.id_repo][repo_metrics.id_metric] = repo_metrics.value

  # Append metrics values to selected repo and other repos
  selected_repo['metrics'] = metrics_dict[selected_repo['id']]
  for repo in other_repos:
    if repo['near'] == True:
      repo['metrics'] = metrics_dict[repo['id']]
  
  results = {
    'selected': selected_repo,
    'repos': other_repos,
  }
  
  # Format JSON
  json_output = json.dumps(results, indent=2)
  
  return json_output


def get_cluster(repos: list, dataset_id: int, selected_repo_name: str, n: int):
  # Realiza escala nos dados para padronizar
  data = _pre_processing(repos)
  
  # Faz o cálculo das distâncias, separando n elementos mais próximos
  [selected_repo, other_repos] = _calc_distances(repos, data, selected_repo_name, n)

  # Salva os resultados com as informações necessárias para realizar as análises
  json_results = _save_results(selected_repo, other_repos)
  
  return json_results
