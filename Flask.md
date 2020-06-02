# Flask

1. Make a new folder
2. Make & activate venv
    $ python3 -m venv .venv
    $ source .venv/bin/activate // or: .\venv\Scripts\activate ./venv/Scripts/activate.bat
3. Dectivate the venv (if u want)
    $ deactivate
4. Install Flask and its dependencies
    $ pip install flask // bare Flask app
    $ pip install -r requirements.txt  // Replica of venv
5. Check installed packages
    $ pip freeze
    $ python
    >>> import flask
6. Built the app, routes, views, etc. then set the environmental variables and run the app
    $ export FLASK_APP=app.py
    $ export FLASK_DEBUG=1
    $ export FLASK_ENV=development
    $ export TEMPLATES_AUTO_RELOAD=True
    $ flask run --reload
7. Generat list of package dependencies (do again whenever add/mod)
    $ pip freeze >requirements.txt

Windows Setup
- Ubuntu
- $ cd Appdir
- $ code .
- Select python interpreter in .venv/bin/python3

## Databases

Database abstraction layer packages -- regular Python objects
- SQLAlchemy
- MongoEngine

## App Structure

`|-someproject
  |-app/             <- Flask application
    |-templates/
    |-static/
    |-main/
      |-__init__.py
      |-errors.py
      |-forms.py
      |-views.py
    |-__init__.py
    |-email.py
    |-models.py
  |-migrations/      <- Database migration scripts
  |-tests/           <- Unit tests
    |-__init__.py
    |-test*.py
  |-venv/            <- Virtual environment
  |-requirements.txt <- List of package dependencies
  |-config.py
  |-flasky.py        <- Define app instance; Tasks to manage app
`