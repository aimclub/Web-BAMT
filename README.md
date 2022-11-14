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

# Web demo

However, if you just want to evaluate the possibilities of working with different parameters of Bayesian network learning algorithms, then you can use the  [web demo](http://bamt.aim.club/), which allows you to work with existing examples and has analytics tools. This functionality was made due to the limited computing capabilities of the server. 

If you want to use the web demo for your projects, then you can run the web service locally on your server and make some changes to the code. Detailed instructions are [here](https://github.com/ITMO-NSS-team/Web-BAMT/wiki/Local-Setup). You can also find rules for formatting input files [there](https://github.com/ITMO-NSS-team/Web-BAMT/wiki/Local-Setup).

At the moment, the web demo is only accessible from the ITMO University network. A video demonstrating the web service can be found [here](https://youtu.be/2w6dRHlzVzs).



# Documentation
More information about BAMT and Web-BAMT can be found [here](https://github.com/ITMO-NSS-team/Web-BAMT/wiki).

# Acknowledgment
The project was carried out as part of the research work of masters and postgraduate students No. 621297 (ITMO University)

# Contacts
If you have questions or suggestions, you can contact us at the following address: ideeva@itmo.ru

# Citation

@article{kaminsky2022bigbravebn,
  title={BigBraveBN: algorithm of structural learning for bayesian networks with a large number of nodes},
  author={Kaminsky, Yury and Deeva, Irina},
  journal={arXiv preprint arXiv:2208.10312},
  year={2022}
}

@article{bubnova2022approach,
  title={Approach of variable clustering and compression for learning large Bayesian networks},
  author={Bubnova, Anna V},
  journal={arXiv preprint arXiv:2208.13605},
  year={2022}
}




