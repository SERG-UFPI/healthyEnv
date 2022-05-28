from sqlalchemy import ForeignKey
from db import db

class MetricRepoModel(db.Model):
  __tablename__ = 'metric_repo'

  id = db.Column(db.String(10), primary_key=True)
  id_metric = db.Column(db.String(10), ForeignKey('metric.id'))
  id_repo = db.Column(db.String(10), ForeignKey('repository.id'))
  value = db.Column(db.Float(precision=10))


  def __init__(self, id, id_metric, id_repo, value):
    self.id = id
    self.id_metric = id_metric
    self.id_repo = id_metric
    self.value = value
