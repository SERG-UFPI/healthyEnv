from flask import Flask
app = Flask(__name__)
from .clustering.cluster import get_cluster

@app.route('/cluster/<path:repo>/<int:near_n>')
def cluters(repo, near_n):
  # TODO: Validar o repositório que foi passado
  # TODO: Validar a quantidade de repositórios próximos (deve ser menor que quantidade total)
  repo_name = '/'.join(repo.split("/",2)[:2]) # Trata a URL pois repositórios
  # do GitHub usam barra para separar o user do nome.

  results = get_cluster(repo_name, near_n)

  return results