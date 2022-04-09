import json
from flask import Flask, Response, request
app = Flask(__name__)
from .clustering.cluster import get_cluster
from .dataset_utils import check_repo, check_repos_count, get_all_repos

@app.route('/cluster/<path:repo>')
def cluters(repo):
  # Verificando se o repositório está no dataset
  if not check_repo(repo):
    return Response('<h2>Erro: Not found</h2>\nO repositório <b>' + repo
        + '</b> não está no dataset.', status=404)
  
  # Verificando a quantidade desejada de repositórios próximos
  if request.args.get('near_n') == None:
    return Response('<h2>Erro: Bad request</h2>\nDeve ser fornecido uma '
        'quantidade de repositórios próximos.', status=400)
  near_n = request.args['near_n']
  repos_count = check_repos_count()
  if (int(near_n) >= repos_count - 1):
    return Response('<h2>Erro: Bad request</h2>\nA quantidade deve ser menor '
        'que o total menos 1, que é <b>' + str(repos_count - 1) + '</b>. '
        '(Solicitado: ' + near_n + ')', status=400)

  # Obtendo os resultados do algoritmo e retornando a response
  results = get_cluster(repo, int(near_n))

  return results

@app.route('/repos')
# TODO: Adicionar opções para retornar informações simplificadas ou detalhadas
def repos():
  repos = get_all_repos()
  repos_json = json.dumps(repos, indent=2)
  
  return repos_json
