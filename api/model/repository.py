from sqlalchemy import ForeignKey
from db import db

class RepositoryModel(db.Model):
  __tablename__ = 'repository'

  id = db.Column(db.String(100), primary_key=True)
  dataset_id = db.Column(db.String(10), ForeignKey('dataset.id'))
  name = db.Column(db.String(80))
  language = db.Column(db.String(20))
  loc = db.Column(db.Integer)
  stars = db.Column(db.Integer)
  forks = db.Column(db.Integer)
  open_issues = db.Column(db.Integer)
  contributors = db.Column(db.Integer)
  commits = db.Column(db.Integer)


  def __init__(self, id, name, language, loc, stars, forks, open_issues, contributors, commits):
    self.id = id
    self.name = name
    self.language = language
    self.loc = loc
    self.stars = stars
    self.forks = forks
    self.open_issues = open_issues
    self.contributors = contributors
    self.commits = commits


  def json(self):
    return {
      self.id: {
        'name': self.name,
        'language': self.language,
        'loc': self.loc,
        'stars': self.stars,
        'forks': self.forks,
        'open_issues': self.open_issues,
        'contributors': self.contributors,
        'commits': self.commits,
      }
    }
  

  @classmethod
  def get_dataset_repos_json(cls, dataset_id: str):
    repositories = cls.query.filter_by(dataset_id=dataset_id)

    json = {
      'total_count': repositories.count(),
      'items': [],
    }

    for repository in repositories:
      json['items'].append({
        'id': repository.id,
        'name': repository.name,
        'language': repository.language,
        'loc': repository.loc,
        'stars': repository.stars,
        'forks': repository.forks,
        'open_issues': repository.open_issues,
        'contributors': repository.contributors,
        'commits': repository.commits,
      })

    return json

  
  @classmethod
  def get_dataset_repos(cls, dataset_id: str):
    return list(cls.query.filter(dataset_id == dataset_id))


  @classmethod
  def find_repository(cls, dataset_id: str, repo_name: str):
    repostory = cls.query.filter_by(dataset_id=dataset_id, name=repo_name).first()
    if repostory:
      return repostory.json()
    else:
      return None
