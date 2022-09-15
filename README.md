# Web-BAMT
Online tool for Bayesian Networks based on BAMT package<br>
Frontend: TypeScript <br>
Backend: Python, SQLite <br>

# The main concept
![output-onlinepngtools](https://user-images.githubusercontent.com/6116991/190323306-8a7b5308-b7d8-453e-8532-fd855db3cb9d.png)

This tool is intended for the analysis of multidimensional distributions by building Bayesian networks, the structure of which is a directed acyclic graph, and the edges show the dependencies between features (nodes). The algorithmic core of the tool is a [BAMT](https://github.com/ITMO-NSS-team/BAMT) library. This core allows any user to build their own Bayesian networks on tabular data of any nature.

Main features:
1. Building network structures based on data using various algorithms;
2. Assignment of expert knowledge in the process of learning networks;
3. Training of distribution parameters in network nodes;
4. Support for various data types (discrete, continuous);
5. Generation of synthetic data;
6. Modularity, extensibility, integrability with ML tools;
7. Combination of a lightweight API for the end user and advanced configuration for research applications.

A more detailed description of the algorithms can be found [here](https://github.com/ITMO-NSS-team/Web-BAMT/wiki/About-BAMT-algorithms).

# How to use
If you want to train your Bayesian network on your data, first install the package: `pip install bamt`

Then the necessary classes are imported from the library:

```import bamt.Networks as Nets```

Next, a network instance is created and training (structure and parameters) is performed:


```bn = Nets.HybridBN(has_logit=False, use_mixture=True)```

```bn.add_edges(discretized_data,  scoring_function=('K2',K2Score))```

```bn.fit_parameters(data)```

More examples can be found [here](https://github.com/ITMO-NSS-team/BAMT/tree/master/tutorials).



