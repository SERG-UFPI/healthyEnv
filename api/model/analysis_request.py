from ast import For
from sqlalchemy import ForeignKey
from db import db

class AnalysisRequestModel(db.Model):
  __tablename__ = 'analysis_request'

  id = db.Column(db.String(10), primary_key=True)
  id_target_dataset = db.Column(db.String(10), ForeignKey('dataset.id'))
  name = db.Column(db.String(80))
  email = db.Column(db.String(80))
  repo_url = db.Column(db.String(180))


  def __init__(self, id,id_target_dataset, name, email, repo_url):
    self.id = id
    self.id_target_dataset = id_target_dataset
    self.name = name
    self.email = email
    self.repo_url = repo_url

  
  def json(self):
    return {
      self.id: {
        'id_dataset': self.id_target_dataset,
        'name': self.name,
        'email': self.email,
        'repo_url': self.repo_url,
      }
    }


  def create_request(self):
    db.session.add(self)
    db.session.commit()