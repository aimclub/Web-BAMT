Project structure
==================

GLOBALS
++++++++

**DATABASE: SQLite**

| ``SAMPLE_SIZE=size of dataframe * 5``

| PREPROCESSING (in this version it remains constant and not available for user to tune)
| First, we encode discrete data, then discretize continuous data.
| *The purpose of this action and more details can be found in section "About BAMT algorithms".*
| :py:class:`encoder = pp.LabelEncoder()`
| :py:class:`discretizer = pp.KBinsDiscretizer(n_bins=5, encode='ordinal', strategy='quantile')`

| EXAMPLE PARAMS
| Geological dataset:
| ``has_logit=0,``
| ``use_mixture=0,``
| ``score_function="K2"``

| Social dataset:
| ``has_logit=1,``
| ``use_mixture=1,``
| ``score_function="MI"`` (different params to avoid isolated vertices)

API
+++

There are 4 main and 1 additional modules implemeneted. Additional modules are tests, 
we use them only in dev stage. Each module follows this pattern:

1. Controller. File with query
2. Service. File with core functions
3. Models. File with declarations of tables in database
4. Schema. File with docs.
5. Other elements for particular route group.

Quick API reference
+++++++++++++++++++

.. qrefflask:: app:create_app('rtd')
   :undoc-static:

AuthMod
++++++++

This module provides a communication between user and auth system.

Controller
-----------

.. autoflask:: app:create_app('rtd')
    :modules: app.api.auth.controller

Models
-------

Declare the tables related to auth system.

Service
--------

Here we defined functions to work with auth system.

Experiment
++++++++++

One of the most important module in application. It is responsible for training
bayssian network, sample from it.


Controller
-----------

.. autoflask:: app:create_app('rtd')
    :modules: app.api.experiment.controller

Models
------

Declare tables with networks and samples.

Service
--------

Core functions to fit bayessian network and save them.

BN manager
+++++++++++

Module provides operations with bayessian networks in database such as: 
find BN(-s) if exists, delete, put and train.

Controller
----------

.. autoflask:: app:create_app('rtd')
    :modules: app.api.bn_manager.controller

Service
--------

Core functions to work with samples.
It contains SampleWorker class that provide sample analysis and processing.

Data manager
+++++++++++++

Module provides operations with data such as:
(up)-, (down-) load datasets, their removal and preprocessing.

Controller
----------

.. autoflask:: app:create_app('rtd')
    :modules: app.api.data_manager.controller

Models
------

Declare tables with datasets.

Service
--------

Core functions to upload datasets and save them.