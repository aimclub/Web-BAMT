Project structure
==================

GLOBALS
++++++++

**DATABASE: SQLite**

| ``SAMPLE_SIZE=442`` (max = 442 due to size of train dataset);
| ``CASE_ID=0`` stands for geological dataset, ``CASE_ID=1`` - for social dataset.

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
   
   We have ordered the modules accoring their usage in main scenario.

AuthMod
++++++++

This module provides a communication between user and auth system.

Controller
-----------

| ``get_token(email, password)``: get token by email and password;
| ``signup(email, password)``: registrate user in database.

Models
-------

Declare the tables related to auth system.

Service
--------

Here we defined functions to work with auth system.

Example
-------

Demonstarte an instanse of pretrained network.

Controller
----------

``get_example(case_id)``: return a network pretrained with

Experiment
-----------

One of the most important module in applictaion. It is responsible for training 
bayssian network, sample from it.


Controller
-----------

``get(owner, name, case_id, bn_params)`` : validate input, train network, 
sample from it and save data.

.. note::

    | In this version we have to unify format of sample (actually, there are 2 types: ``discrete`` and ``continuous``). We descritize continouos data, bins equal to output of :py:class:`np.histogram_bin_edges()` on train dataset for better comparison.
    | ``get_root_nodes(case_id)``: return initial nodes from dataset.

Models
------

Declare tables with networks and samples.

Service
--------

Core functions to fit bayessian network and save them.

bn_manager
----------

Module provides operations with bayessian networks in database such as: 
find BN(-s) if exists, delete, put and train.

Controller
----------

| ``get_BN(owner)``: return a list of bn(-s) (with data about them);
| ``get_BN_names(owner)``: return a list of bn(-s) names user owns;
| ``get_sample(owner, name, node)``: return an sample data array with ``size=SAMPLE_SIZE``;
| ``remove(owner, name)``: remove bn (and its sample) from database.











































