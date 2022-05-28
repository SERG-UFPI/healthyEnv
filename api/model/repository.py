from sqlalchemy import ForeignKey
from db import db

class Repository(db.Model):
  __tablename__ = 'repository'

  id = db.Column(db.String(100), primary_key=True)
  dataset_id = db.Column(db.String(10), ForeignKey('dataset.id'))
  name = db.Column(db.String(80))
  language = db.Column(db.String(20))
  loc = db.Column(db.Integer)
  stars = db.Column(db.Integer)
  forks = db.Column(db.Integer)
  open_issues = db.Column(db.Integer)
  developers = db.Column(db.Integer)
  commits = db.Column(db.Integer)


  def __init__(self, id, name, language, loc, stars, forks, open_issues, developers, commits, metrics_values = []):
    self.id = id
    self.name = name
    self.language = language
    self.loc = loc
    self.stars = stars
    self.forks = forks
    self.open_issues = open_issues
    self.developers = developers
    self.commits = commits
    self.metrics_values = metrics_values