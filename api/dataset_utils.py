import json
import os


def _load_repos():
  root_dir = os.path.abspath(os.path.join(__file__ ,".."))
  print(root_dir)
  repos = []
  data = json.load(open(root_dir + '/repos.json'))
  
  return data


def check_repo(repo_name: str):
  data = _load_repos()
  found = False
  for repo, values in data.items():
    if repo == repo_name:
      found = True
  
  return found


def check_repos_count():
  data = _load_repos()
  repos_count = len(data)

  return repos_count
