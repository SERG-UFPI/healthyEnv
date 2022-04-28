import json
import os


def get_all_metrics():
  root_dir = os.path.abspath(os.path.join(__file__ ,".."))
  data = json.load(open(root_dir + '/datasets/metrics_summary.json'))
  
  return data