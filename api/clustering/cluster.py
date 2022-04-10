import json
import math
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from .model.repository import Repository
import os

def _load_repos():
  root_dir = os.path.abspath(os.path.join(__file__ ,"../.."))
  print(root_dir)
  repos = []
  data = json.load(open(root_dir + '/repos.json'))
  for repo, values in data.items():
    repos.append(Repository(repo, values['language'], values['size'],
        values['stars'], values['forks'], values['open_issues'], values['devs'],
        values['commits'], values['files']))
  
  return repos


def _pre_processing(repos):
  repos_data = []
  for repo in repos:
    repos_data.append([repo.size, repo.stars, repo.forks, repo.open_issues, repo.developers, repo.commits, repo.files])
  
  # Aplicando Scaler
  scaler = StandardScaler()
  repos_data = scaler.fit_transform(repos_data)
  
  return repos_data


def _calc_distances(repos, data, selected_repo_name, n):
  # Pegando o index do repositório selecionado
  selected_repo_index = 0
  for index, repo in enumerate(repos):
    if repo.name == selected_repo_name:
      selected_repo_index = index
      break

  # Aplicando o PCA em uma lista separada para posteriormente colocar junto com
  # os dados que serão retornados
  pca = PCA(n_components=2)
  data_pca = pca.fit_transform(data)

  # Separando o repositório selecionado para continuar o algoritmo
  selected_repo = repos[selected_repo_index]
  selected_repo_data = data[selected_repo_index]
  selected_repo_pca = data_pca[selected_repo_index]
  repos.pop(selected_repo_index)
  data = data.tolist()
  data.pop(selected_repo_index)
  data_pca = data_pca.tolist()
  data_pca.pop(selected_repo_index)
  
  # Calcular a distância do repositório selecionado para os demais
  distances = []
  for index, repo_data in enumerate(data):
    distance = math.sqrt((repo_data[0] - selected_repo_data[0]) ** 2 
        + (repo_data[1] - selected_repo_data[1]) ** 2 
        + (repo_data[2] - selected_repo_data[2]) ** 2 
        + (repo_data[3] - selected_repo_data[3]) ** 2 
        + (repo_data[4] - selected_repo_data[4]) ** 2 
        + (repo_data[5] - selected_repo_data[5]) ** 2 
        + (repo_data[6] - selected_repo_data[6]) ** 2)
    distances.append({
      'name': repos[index].name,
      'distance': distance,
      'pca_x': data_pca[index][0],
      'pca_y': data_pca[index][1] })
  
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
    'pca_x': selected_repo_pca[0],
    'pca_y': selected_repo_pca[1],
  }
  
  return [selected_repo_output, distances]


def _save_results(selected_repo, other_repos):
  # Montagem do dicionário completo que será o JSON com todas as informações
  # para serem enviadas à visualização
  results = {
    'selected': selected_repo,
    'repos': other_repos,
  }

  json_output = json.dumps(results, indent=2)

  return json_output


def get_cluster(selected_repo_name: str, n: int):
  repos = _load_repos()
  
  # Realiza escala nos dados para padronizar
  data = _pre_processing(repos)
  
  #Faz o cálculo das distâncias, separando n elementos mais próximos
  # n = 3
  # selected_repo_name = 'google/gson'
  [selected_repo, other_repos] = _calc_distances(repos, data, selected_repo_name, n)
  
  # Salva os resultados com as informações necessárias para realizar as análises
  json_results = _save_results(selected_repo, other_repos)
  # print(json_results)
  return json_results


# if __name__ == '__main__':
#   # Carrega repositórios do arquivo JSON
#   repos = _load_repos()
  
#   # Realiza escala nos dados para padronizar
#   data = _pre_processing(repos)
  
#   #Faz o cálculo das distâncias, separando n elementos mais próximos
#   n = 3
#   selected_repo_name = 'google/gson'
#   [selected_repo, other_repos] = _calc_distances(repos, data, selected_repo_name, n)
  
#   # Salva os resultados com as informações necessárias para realizar as análises
#   json_results = _save_results(selected_repo, other_repos)
#   print(json_results)
