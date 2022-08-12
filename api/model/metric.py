from unicodedata import category
from sqlalchemy import ForeignKey
from db import db

class MetricModel(db.Model):
  __tablename__ = 'metric'

  id = db.Column(db.String(10), primary_key=True)
  name = db.Column(db.String(80))
  description = db.Column(db.String(300))
  is_upper = db.Column(db.Boolean)
  category_id = db.Column(db.String(10), ForeignKey('metric_category.id'))


  def __init__(self, id, name, description, is_upper, category_id):
    self.id = id
    self.name = name
    self.description = description
    self.is_upper = is_upper
    self.category_id = category_id

  
  def json(self):
    return {
      self.id: {
        'name': self.name,
        'description': self.description,
        'is_upper': self.is_upper,
        'category_id': self.category_id,
      }
    }


  @classmethod
  def get_all_metrics_json(cls):
    metrics = cls.query.all()

    json = {
      'total_count': len(metrics),
      'items': []
    }
    for metric in metrics:
      json['items'].append({
        'id': metric.id,
        'name': metric.name,
        'description': metric.description,
        'is_upper': metric.is_upper,
        'category_id': metric.category_id,
      })

    return json