# Web-BAMT
Online tool for Bayesian Networks based on BAMT package<br>
Frontend: TypeScript <br>
Backend: Python, SQLite <br>

# The main concept
![icon](https://user-images.githubusercontent.com/6116991/190202689-86890924-ea9e-4571-84cc-4fd8ca56cbc7.png|width=100)
This tool is intended for the analysis of multidimensional distributions by building Bayesian networks, the structure of which is a directed acyclic graph, and the edges show the dependencies between features (nodes). The algorithmic core of the tool is a [BAMT](https://github.com/ITMO-NSS-team/BAMT) library. This core allows any user to build their own Bayesian networks on tabular data of any nature.

Main features:
1. Building network structures based on data using various algorithms;
2. Assignment of expert knowledge in the process of learning networks;
3. Training of distribution parameters in network nodes;
4. Support for various data types (discrete, continuous);
5. Generation of synthetic data;
6. Modularity, extensibility, integrability with ML tools;
7. Combination of a lightweight API for the end user and advanced configuration for research applications.

# How to use
If you want to train your Bayesian network on your data, first install the package: `pip install bamt`


