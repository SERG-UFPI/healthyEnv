from db import db

class DatasetModel(db.Model):
  __tablename__ = 'dataset'

  id = db.Column(db.String(10), primary_key=True)
  name = db.Column(db.String(80))
  description = db.Column(db.String(300))
  repo_count = db.Column(db.Integer)
  author = db.Column(db.String(40))


  def __init__(self, id, name, description, repo_count, author):
    self.id = id
    self.name = name
    self.description = description
    self.repo_count = repo_count
    self.author = author


  def json(self):
    return {
      self.id: {
        'name': self.name,
        'description': self.description,
        'repo_count': self.repo_count,
        'author': self.author,
      }
    }


  @classmethod
  def get_all_datasets_json(cls):
    datasets = cls.query.all()

    json = {
      'total_count': len(datasets),
      'items': []
    }
    for dataset in datasets:
      json['items'].append({
        'id': dataset.id,
        'name': dataset.name,
        'description': dataset.description,
        'repo_count': dataset.repo_count,
        'author': dataset.author,
      })

    return json


  @classmethod
  def find_dataset(cls, dataset_id: str):
    dataset = cls.query.filter_by(id=dataset_id).first()
    if dataset:
      return dataset.json()
    else:
      return None
