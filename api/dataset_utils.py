import json
import os


def _load_repos(dataset_id: int):
  root_dir = os.path.abspath(os.path.join(__file__ ,".."))
  data = json.load(open(root_dir + '/datasets/dataset_' + str(dataset_id) + '.json'))
  
  return data


def check_repo(dataset_id: int, repo_name: str):
  data = _load_repos(dataset_id)
  found = False
  for repo, values in data.items():
    if repo == repo_name:
      found = True
  
  return found


def check_repos_count(dataset_id: int):
  data = _load_repos(dataset_id)
  repos_count = len(data)

  return repos_count


def get_all_repos(dataset_id: int):
  data = _load_repos(dataset_id)
  repos_name_list = []
  for repo, values in data.items():
    repos_name_list.append({
      'name': repo,
      'language': values['language'],
      'loc': values['loc'],
      'stars': values['stars'],
      'forks': values['forks'],
      'open_issues': values['open_issues'],
      'devs': values['devs'],
      'commits': values['commits'],
    })

  return repos_name_list


def get_all_datasets():
  root_dir = os.path.abspath(os.path.join(__file__ ,".."))
  data = json.load(open(root_dir + '/datasets/dataset_summary.json'))
  
  return data