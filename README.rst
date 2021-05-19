Django + React custom temlate
============

Custom templated built with:

- Django
- DRF
- Redis
- PostgreSQL
- Channels
- React
- Router
- Redux
- Docker
- Caddy

Pre-requirements
----------------

This project built with Docker. To build and run it on your machine you will need to install `Docker Engine <https://docs.docker.com/engine/install/>`_ and `Docker Compose <https://docs.docker.com/compose/install/>`_.


Settings
--------

Local
^^^^^
Find your local envs file in ``.envs/.local/`` folder

If you are not going to use implemented frontend, open ``.django`` file and set ``HAS_EMBDED_FRONTEND=False``

This project is ready to run locally


Basic Commands
--------------

Local Build and Run
^^^^^^^^^^^^^^^^^^^

Install dependences and build your frontend part (If applicable). See frontend/src/config.js for additional envs to controll app settings::

    $ cd frontend
    $ npm install
    $ npm run build

To build backend server go to project root and run::

    $ docker-compose -f local.yml build

To run built backend server go to project root and run::

    $ docker-compose -f local.yml up


Setting Up Your Users
^^^^^^^^^^^^^^^^^^^^^

* To create a **superuser account**, use this command::

    $ docker-compose -f local.yml run --rm django python manage.py createsuperuser

After it you can login to admin panel from this link: http://localhost:8000/admin/



