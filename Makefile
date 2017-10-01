 	python setup.py sdist bdist_wheel register upload  # Release to pypi
  
  coverage:
 -	coverage erase
 -	coverage run --source=bottle.py test/testall.py
 -	coverage combine
 -	coverage report
 -	coverage html
 +	python -m coverage erase
 +	python -m coverage run --source=bottle.py test/testall.py
 +	python -m coverage combine
 +	python -m coverage report
 +	python -m coverage html
  
  push: test_all
  	git push origin HEAD
