import json
import math
import numpy as np
from sklearn.preprocessing import StandardScaler
from model.repository import Repository


def load_repos():
  repos = []
  data = json.load(open('repos.json'))
  for repo, values in data.items():
    repos.append(Repository(repo, values['size'], values['stars'],
        values['forks'], values['open_issues'], values['devs'],
        values['commits'], values['files']))
  
  return repos


def pre_processing(repos):
  # Obtendo (por enquanto) os valores de issues e de forks em uma lista com
  # mesma ordem. # TODO não necessariamente x: issues e y: forks. usar PCA. 
  issues_forks_data = []
  for repo in repos:
    issues_forks_data.append([repo.open_issues, repo.forks])
  
  # Aplicando Scaler
  scaler = StandardScaler()
  issues_forks_data = scaler.fit_transform(issues_forks_data)
  
  return issues_forks_data


def calc_distances(repos, data, selected_repo_name, n):
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
  
  # Calcular a distância do repositório selecionado para os demais
  distances = []
  for index, repo_data in enumerate(data):
    distance = math.sqrt((repo_data[0] - selected_repo_data[0]) ** 2
        + (repo_data[1] - selected_repo_data[1]) ** 2)
    distances.append({
      'name': repos[index].name,
      'distance': distance,
      'x': repo_data[0],
      'y': repo_data[1] })
  
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
    'x': selected_repo_data[0],
    'y': selected_repo_data[1],
  }
  
  return [selected_repo_output, distances]


def save_results(selected_repo, other_repos):
  # Montagem do dicionário completo que será o JSON com todas as informações
  # para serem enviadas à visualização
  results = {
    'selected': selected_repo,
    'repos': other_repos,
  }

  json_output = json.dumps(results, indent=2)

  return json_output


if __name__ == '__main__':
  # Carrega repositórios do arquivo JSON
  repos = load_repos()
  
  # Realiza escala nos dados para padronizar
  data = pre_processing(repos)
  
  # Faz o cálculo das distâncias, separando n elementos mais próximos
  n = 3
  selected_repo_name = 'google/gson'
  [selected_repo, other_repos] = calc_distances(repos, data, selected_repo_name, n)
  
  # Salva os resultados com as informações necessárias para realizar as análises
  json_results = save_results(selected_repo, other_repos)
  print(json_results)
