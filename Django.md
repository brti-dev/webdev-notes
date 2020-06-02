# Django

## Set up a project

Create a Virtual Environment for myproject
    $ mkvirtualenv myproject
Reactivate the environment
    $ workon myproject
Create a new project
    $ django-admin startproject mysite
A document structure is created:
    manage.py - command line utilities
    /mysite/__init__.py - indicates to py that this is a package
            settings.py
            urls.py - a table of contents of the site
Start development server
    $ python manage.py runserver

### Anaconda

Start > Anaconda Prompt
    $ conda create -n hellodjango python=3.8
    $ conda activate hellodjango // use to reactivate env
    $ django-admin startproject myproject
Create db
    $ py manage.py migrate
Run dev derver
    $ py manage.py runserver

## Database

Postgres
    $ createdb -U postgres everycheese

## Add apps to the project

Make a new app in the project root directory to make it a top-level module rather than a submodule
    $ python manage.py startapp polls

## Changing models

1. Change your models (in models.py).
2. Run `python manage.py makemigrations` to create migrations for those changes
3. Run `python manage.py migrate` to apply those changes to the database.

