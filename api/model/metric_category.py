from db import db

class MetricCategory(db.Model):
  __tablename__ = 'metric_category'

  id = db.Column(db.String(10), primary_key=True)
  working_group = db.Column(db.String(80))
  description = db.Column(db.String(300))

  def __init__(self, id, working_group, description):
    self.id = id
    self.working_group = working_group
    self.description = description

  def json(self):
    return {
      self.id: {
        'working_group': self.working_group,
        'description': self.description
      }
    }

  @classmethod
  def get_all_metric_categories(cls):
    return list(cls.query.all())


  @classmethod
  def get_all_metrics_categories_json(cls):
    metric_categories = cls.query.all()

    json = {
      'total_count': len(metric_categories),
      'items': []
    }
    for category in metric_categories:
      json['items'].append({
        'id': category.id,
        'working_group': category.working_group,
        'description': category.description,
      })

    return json