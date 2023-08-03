Local Setup
============

Developers can run Web-BAMT manually on local machine. In order to do this, 
follow these steps:

Install Web-BAMT
+++++++++++++++++

Install Web-BAMT from here :

    ::
        
            git clone https://github.com/ITMO-NSS-team/Web-BAMT`

Install backend dependencies
+++++++++++++++++++++++++++++

*We highly recommend using virtual environment.*

| Install Python >=3.9, <3.11. Then install everything from ``requirements.txt``:
| :py:class:`pip install -r requirements.txt`

Set up BAMT
-----------

Take care of BAMT's config: ``selbst.ini``. Nodes must be a directory where
models of logit nodes store (it can be any directory), Log must be absolute
path to log file of BAMT. Default log is inside bamt_special repo, called
``logging.conf``.

Install frontend dependencies
+++++++++++++++++++++++++++++

*If npm is not installed, follow* `instructions <https://docs.npmjs.com/downloading-and-installing-node-js-and-npm>`_ .

| Move to "frontend" folder and run:
| ``npm config set fetch-retry-mintimeout 2000000``
| ``npm config set fetch-retry-maxtimeout 12000000``
| ``npm set timeout=1000000``

``npm install --legacy-peer-deps --loglevel verbose``

First run
++++++++++

Add enviroment variables
------------------------

| ``export FLASK_APP=main.py``
| ``export DATASETS_FOLDER=<path/to/datasets>``
| ``export SAMPLES_FOLDER=<path/to/samples>``

You can also set the last two variables in ``app/api/config.py`` (Base config)

Run Web-BAMT API
-----------------

| Move to Web-BAMT folder and run:
| ``flask run``
| This run a local backend API. You can either run each server in terminal or run it as back process using ``nohup``:
| ``nohup flask run > log.txt 2>&1 &\``.
| Note that frontend and backend must be on different ports. You can use ``flask run --port=xxxx`` to set port for API.

Seeding database
----------------

| Navigate to webbamt directory and run the following to seed:
| :py:class:`flask seed run`

Set up frontend
++++++++++++++++

Open ``frontend/.env.development`` and passed the adress of API,
it can be found in output of flask run (usually ``http://localhost:5000``).

Run frontend
-------------

| Move to 'frontend' folder and run:
| ``yarn start``
| This run a local frontend. You can either run each server in terminal or
  run it as back process using ``nohup`` the same as API.

Start verification
+++++++++++++++++++

Front
------

Go to adress from output of frontend server. There should be an
authorization page.

Back
-----

Create and run ``test.py`` with query to API:

.. code-block:: python

    import requests
    BASE = '<YOUR_API>' # usually http://127.0.0.1:5000
    assert requests.get(f"{BASE}/api/htest/health").status_code == 200
    print("OK")
