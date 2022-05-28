from db import db

class Dataset(db.Model):
  __tablename__ = 'dataset'

  id = db.Column(db.String(10), primary_key=True)
  name = db.Column(db.String(80))
  description = db.Column(db.String(300))
  repo_count = db.Column(db.Integer)
  author = db.Column(db.String(40))


  def __init__(self, id, name, description, repo_count, author, repos_snapshot = []):
    self.id = id
    self.name = name
    self.description = description
    self.repo_count = repo_count
    self.author = author
    self.repos_snapshot = repos_snapshot