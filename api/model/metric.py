from db import db

class MetricModel(db.Model):
  __tablename__ = 'metric'

  id = db.Column(db.String(10), primary_key=True)
  name = db.Column(db.String(80))
  description = db.Column(db.String(300))
  is_upper = db.Column(db.Boolean)


  def __init__(self, id, name, description, is_upper):
    self.id = id
    self.name = name
    self.description = description
    self.is_upper = is_upper

  
  def json(self):
    return {
      self.id: {
        'name': self.name,
        'description': self.description,
        'is_upper': self.is_upper,
      }
    }


  @classmethod
  def get_all_metrics_json(cls):
    metrics = cls.query.all()

    json = {
      'metric_count': len(metrics),
      'metrics': {}
    }
    for metric in metrics:
      json['metrics'][metric.id] = {
        'name': metric.name,
        'description': metric.description,
        'is_upper': metric.is_upper,
      }

    return json