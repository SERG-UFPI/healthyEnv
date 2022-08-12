from ast import For
import enum
import json
from sqlalchemy import ForeignKey, Enum
from db import db

class AnalysisStatusEnum(enum.Enum):
  RECEIVED = 'RECEIVED'
  IN_PROGRESS = 'IN PROGRESS'
  DONE = 'DONE'

class AnalysisRequestModel(db.Model):
  __tablename__ = 'analysis_request'

  id = db.Column(db.String(10), primary_key=True)
  id_target_dataset = db.Column(db.String(10), ForeignKey('dataset.id'))
  name = db.Column(db.String(80))
  email = db.Column(db.String(80))
  repo_url = db.Column(db.String(180))
  status = db.Column(Enum(AnalysisStatusEnum))


  def __init__(self, id,id_target_dataset, name, email, repo_url, status = AnalysisStatusEnum.RECEIVED):
    self.id = id
    self.id_target_dataset = id_target_dataset
    self.name = name
    self.email = email
    self.repo_url = repo_url
    self.status = status


  def json(self):
    return {
      self.id: {
        'id_dataset': self.id_target_dataset,
        'name': self.name,
        'email': self.email,
        'repo_url': self.repo_url,
        'status': str(self.status).split('.')[1],
      }
    }


  def create_request(self):
    db.session.add(self)
    db.session.commit()


  @classmethod
  def get_requests_by_id_json(cls, email):
    requests = cls.query.filter_by(email=email).all()

    json = {
      'total_count': len(requests),
      'items': []
    }

    for request in requests:
      json['items'].append({
        'id': request.id,
        'dataset_id': request.id_target_dataset,
        'name': request.name,
        'email': request.email,
        'repo_url': request.repo_url,
        'status': str(request.status).split('.')[1],
      })
    
    return json
    