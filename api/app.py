from distutils.log import debug
import json
from clustering.cluster import get_cluster
from dataset_utils import check_repo, check_repos_count, get_all_repos, get_all_datasets
from metrics_utils import get_all_metrics
from db import db
from dotenv import load_dotenv
import os

# Flask settings
from flask import Flask, Response, request
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

# Load environment variables
load_dotenv()

# Database settings
db_user = os.environ['DB_USER']
db_password = os.environ['DB_PASSWORD']
db_host = os.environ['DB_HOST']
db_name = os.environ['DB_NAME']
app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql+pymysql://{db_user}:{db_password}@{db_host}/{db_name}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


# Creates database tables after first request
@app.before_first_request
def create_db():
  with app.app_context():
    from model.dataset import Dataset
    from model.repository import Repository
    from model.metric import MetricModel
    from model.metric_repo import MetricRepoModel
    db.create_all()


@app.route('/datasets/<int:dataset_id>/cluster/<path:repo>')
def cluters(dataset_id, repo):
  try:
    # Verificando se o repositório está no dataset
    if not check_repo(dataset_id, repo):
      return Response('<h2>Erro: Not found</h2>\nO repositório <b>' + repo
          + '</b> não está no dataset.', status=404)
    
    # Verificando a quantidade desejada de repositórios próximos
    if request.args.get('near_n') == None:
      return Response(
        json.dumps({
          'message': 'Bad request - missing near_n', 
          'description': 'You must provide an amount for near repositories.'
        }, indent=2), status=400, mimetype='application/json')
    near_n = request.args['near_n']
    repos_count = check_repos_count(dataset_id)
    if (int(near_n) > repos_count - 1):
      return Response(
        json.dumps({
          'message': 'Bad request - too much near repositories', 
          'description': 'The amount of near repositories must be less than the dataset size, which is ' + str(repos_count) + '.'
        }, indent=2), status=400, mimetype='application/json')

    # Obtendo os resultados do algoritmo e retornando a response
    results = get_cluster(dataset_id, repo, int(near_n))

    return results
  except FileNotFoundError:
    return Response(
        json.dumps({
          'message': 'Bad request - non-existent dataset', 
          'description': 'The dataset provided does not match any existing dataset.'
        }, indent=2), status=400, mimetype='application/json')


@app.route('/datasets/<int:dataset_id>/repos')
def dataset_repos(dataset_id):
  try:
    repos = get_all_repos(dataset_id)
    repos_json = json.dumps(repos, indent=2)
    return repos_json
  except FileNotFoundError:
    return Response(
        json.dumps({
          'message': 'Bad request - non-existent dataset', 
          'description': 'The dataset provided does not match any existing dataset.'
        }, indent=2), status=400, mimetype='application/json')


@app.route('/datasets')
def datasets():
  return get_all_datasets()


@app.route('/metrics')
def metrics():
  return get_all_metrics()

if __name__ == '__main__':
  db.init_app(app)
  app.run(debug=True)