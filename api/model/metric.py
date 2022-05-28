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