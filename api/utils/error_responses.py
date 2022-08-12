from flask import Response
import json

class ErrorResponses:
  non_existent_dataset = Response(
    json.dumps({
      'message': 'Bad request - non-existent dataset', 
      'description': 'The provided dataset ID does not match any existing dataset.'
    }, indent=2), status=400, mimetype='application/json'
  )

  repo_not_found = Response(
    json.dumps({
      'message': 'Bad request - repository not found', 
      'description': 'You must provide an existent repository.' 
    }, indent=2), status=400, mimetype='application/json'
  )

  missing_n = Response(
    json.dumps({
      'message': 'Bad request - missing near_n', 
      'description': "You must provide an amount for near repositories as a query param called 'near_n'."
    }, indent=2), status=400, mimetype='application/json'
  )

  missing_info = Response(
    json.dumps({
      'message': 'Bad request - missing information', 
      'description': "The body must provide 'name', 'email' and 'repo_url' values."
    }, indent=2), status=400, mimetype='application/json'
  )

  def invalid_n(repos_count: int):
    return Response(
      json.dumps({
        'message': "Bad request - invalid 'near_n'", 
        'description': 'The amount of near repositories must be less than the dataset size, which is ' + str(repos_count) + ', and more than 0.'
      }, indent=2), status=400, mimetype='application/json'
    )