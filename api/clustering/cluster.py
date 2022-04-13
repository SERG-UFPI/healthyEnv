import json
import math
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from .model.repository import Repository
import os

def _load_json_files():
  root_dir = os.path.abspath(os.path.join(__file__ ,"../.."))
  print(root_dir)
  repos = []
  data = json.load(open(root_dir + '/repos.json'))

  ### Metrics files
  code_changes_commits = json.load(open(root_dir + '/code-changes-commits.json'))
  code_changes_lines_added = json.load(open(root_dir + '/code-changes-lines-added.json'))
  code_changes_lines_removed = json.load(open(root_dir + '/code-changes-lines-removed.json'))
  code_changes_lines_avg_lines_commit = json.load(open(root_dir + '/code-changes-lines-avg-lines-commit.json'))
  code_changes_lines_avg_files_commit = json.load(open(root_dir + '/code-changes-lines-avg-files-commit.json'))
  ## Metrics files

  # Montagem da lista de repositórios
  for repo, values in data.items():
    repos.append(Repository(repo, values['language'], values['size'],
        values['stars'], values['forks'], values['open_issues'], values['devs'],
        values['commits'], values['files']))
  
  return [
    repos, 
    code_changes_commits, 
    code_changes_lines_added,
    code_changes_lines_removed, 
    code_changes_lines_avg_lines_commit, 
    code_changes_lines_avg_files_commit
  ]


def _pre_processing(repos):
  repos_data = []
  for repo in repos:
    repos_data.append([repo.size, repo.stars, repo.forks, repo.open_issues, repo.developers, repo.commits, repo.files])
  
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
    'name': selected_repo.name,
    'language': selected_repo.language,
    'size': selected_repo.size,
    'stars': selected_repo.stars,
    'forks': selected_repo.forks,
    'open_issues': selected_repo.open_issues,
    'devs': selected_repo.developers,
    'commits': selected_repo.commits,
    'files': selected_repo.files,
    'x': selected_repo_data[0],
    'y': selected_repo_data[1],
  }
  
  return [selected_repo_output, distances]


def _save_results(selected_repo, other_repos, code_changes_commits, code_changes_lines_added, code_changes_lines_removed, code_changes_lines_avg_lines_commit, code_changes_lines_avg_files_commit):
  # Montagem do dicionário completo que será o JSON com todas as informações
  # para serem enviadas à visualização
  selected_repo['metrics'] = {}
  selected_repo['metrics']['code_changes_commits'] = code_changes_commits[selected_repo['name']]
  selected_repo['metrics']['code_changes_lines_added'] = code_changes_lines_added[selected_repo['name']]
  selected_repo['metrics']['code_changes_lines_removed'] = code_changes_lines_removed[selected_repo['name']]
  selected_repo['metrics']['code_changes_lines_avg_lines_commit'] = code_changes_lines_avg_lines_commit[selected_repo['name']]
  selected_repo['metrics']['code_changes_lines_avg_files_commit'] = code_changes_lines_avg_files_commit[selected_repo['name']]

  for repo in other_repos:
    repo['metrics'] = {}
    repo['metrics']['code_changes_commits'] = code_changes_commits[repo['name']]
    repo['metrics']['code_changes_lines_added'] = code_changes_lines_added[repo['name']]
    repo['metrics']['code_changes_lines_removed'] = code_changes_lines_removed[repo['name']]
    repo['metrics']['code_changes_lines_avg_lines_commit'] = code_changes_lines_avg_lines_commit[repo['name']]
    repo['metrics']['code_changes_lines_avg_files_commit'] = code_changes_lines_avg_files_commit[repo['name']]

  results = {
    'selected': selected_repo,
    'repos': other_repos,
  }

  json_output = json.dumps(results, indent=2)

  return json_output


def get_cluster(selected_repo_name: str, n: int):
  [ repos, 
    code_changes_commits, 
    code_changes_lines_added,
    code_changes_lines_removed, 
    code_changes_lines_avg_lines_commit, 
    code_changes_lines_avg_files_commit ] = _load_json_files()
  
  # Realiza escala nos dados para padronizar
  data = _pre_processing(repos)
  
  #Faz o cálculo das distâncias, separando n elementos mais próximos
  # n = 3
  # selected_repo_name = 'google/gson'
  [selected_repo, other_repos] = _calc_distances(repos, data, selected_repo_name, n)
  
  # Salva os resultados com as informações necessárias para realizar as análises
  json_results = _save_results(selected_repo, other_repos, code_changes_commits, code_changes_lines_added, code_changes_lines_removed, code_changes_lines_avg_lines_commit, code_changes_lines_avg_files_commit)
  # print(json_results)
  return json_results
