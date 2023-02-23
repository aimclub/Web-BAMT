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

Features in development:
1. Loading your own training dataset;
2. Define regression and classification models in parametric learning;
3. Development of advanced distribution analytics and visual comparison of different networks.

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
More information about BAMT and Web-BAMT can be found [here](https://web-bamt.readthedocs.io/en/latest/).

# Acknowledgment
The project was carried out as part of the research work of masters and postgraduate students No. 622262 (ITMO University)

# Contacts
If you have questions or suggestions, you can contact us at the following address: ideeva@itmo.ru (Irina Deeva)

# Our Team
Irina Deeva - Project Manager

Roman Netrogolov - Backend developer

Karine Shakhkyan - development of logic for working with composite BN in a web service

Anna Bubnova - development of the algorithmic core of the project

Yuri Kaminsky - developer of the algorithmic core of the project



# Citation

@article{deeva2023advanced,
  title={Advanced Approach for Distributions Parameters Learning in Bayesian Networks with Gaussian Mixture Models and Discriminative Models},
  author={Deeva, Irina and Bubnova, Anna and Kalyuzhnaya, Anna V},
  journal={Mathematics},
  volume={11},
  number={2},
  pages={343},
  year={2023},
  publisher={MDPI}
}

@article{kaminsky2022bigbravebn,
  title={BigBraveBN: algorithm of structural learning for bayesian networks with a large number of nodes},
  author={Kaminsky, Yury and Deeva, Irina},
  journal={Procedia Computer Science},
  volume={212},
  pages={191--200},
  year={2022},
  publisher={Elsevier}
}

@article{bubnova2022approach,
  title={Approach of variable clustering and compression for learning large Bayesian networks},
  author={Bubnova, Anna and Deeva, Irina},
  journal={Procedia Computer Science},
  volume={212},
  pages={275--283},
  year={2022},
  publisher={Elsevier}
}



