import json
from .clustering.cluster import get_cluster
from .dataset_utils import check_repo, check_repos_count, get_all_repos, get_all_datasets
from .metrics_utils import get_all_metrics

from flask import Flask, Response, request
from flask_cors import CORS
app = Flask(__name__)
CORS(app)


@app.route('/datasets/<int:dataset_id>/cluster/<path:repo>')
def cluters(dataset_id, repo):
  try:
    # Verificando se o repositório está no dataset
    if not check_repo(dataset_id, repo):
      return Response('<h2>Erro: Not found</h2>\nO repositório <b>' + repo
          + '</b> não está no dataset.', status=404)
    
    # Verificando a quantidade desejada de repositórios próximos
    if request.args.get('near_n') == None:
      return Response('<h2>Erro: Bad request</h2>\nDeve ser fornecido uma '
          'quantidade de repositórios próximos.', status=400)
    near_n = request.args['near_n']
    repos_count = check_repos_count(dataset_id)
    if (int(near_n) >= repos_count - 1):
      return Response('<h2>Erro: Bad request</h2>\nA quantidade deve ser menor '
          'que o total menos 1, que é <b>' + str(repos_count - 1) + '</b>. '
          '(Solicitado: ' + near_n + ')', status=400)

    # Obtendo os resultados do algoritmo e retornando a response
    results = get_cluster(dataset_id, repo, int(near_n))

    return results
  except FileNotFoundError:
    return Response('<h2>Erro: Bad request</h2>\nO dataset de id ' 
        + str(dataset_id) + ' não existe.', status=400)


@app.route('/datasets/<int:dataset_id>/repos')
def dataset_repos(dataset_id):
  try:
    repos = get_all_repos(dataset_id)
    repos_json = json.dumps(repos, indent=2)
    return repos_json
  except FileNotFoundError:
    return Response('<h2>Erro: Bad request</h2>\nO dataset de id ' 
        + str(dataset_id) + ' não existe.', status=400)


@app.route('/datasets')
def datasets():
  return get_all_datasets()


@app.route('/metrics')
def metrics():
  return get_all_metrics()