export interface IExperimentRootNodes {
  root_nodes: string[];
}

export interface IBNParams {
  scoring_function: string;
  use_mixture: boolean;
  has_logit: boolean;
  params: {
    init_nodes: string[];
    // bl_add: string; // don't touch yet
    init_edges: [string, string][];
    // remove_init_edges: boolean; // TODO: add parameter
    // white_list: string; // don't touch yet
  };
}

export interface IBNManagerModel extends IBNParams, ITrainNetwork {
  name: string;
  owner: string;
}

export interface INetwork {
  nodes: { name: string; type: string }[];
  edges: [string, string][];
}

export interface ITrainNetwork extends INetwork {
  descriptor: {
    Period: string;
    Netpay: string;
    Permeability: string;
    Lithology: string;
    Gross: string;
    "Structural setting": string;
    Porosity: string;
    "Tectonic regime": string;
    Depth: string;
  };
}

export interface IBNData {
  networks: string;
}

export interface ITrainBN {
  network: ITrainNetwork;
  sample: object;
  // example
  /* sample: {
    Period: {
      CRETACEOUS: 3;
      PERMIAN: 2;
    };
    Lithology: {
      CHALK: 1;
      DOLOMITE: 2;
      LIMESTONE: 1;
      SANDSTONE: 1;
    };
    Netpay: [
      19.37648928448231,
      62.78327880957375,
      35.30374241653249,
      33.9221572798462,
      40.17107710299036
    ];
    Permeability: [
      0.25222077930121467,
      490.07909761572756,
      142.4973086145372,
      31.769103407129343,
      449.1516170531695
    ];
    "Tectonic regime": {
      COMPRESSION: 3;
      EXTENSION: 1;
      INVERSION: 1;
    };
    Gross: [
      68.81600694089552,
      113.65594263803254,
      72.09120424039781,
      252.23237132389463,
      271.11438968158745
    ];
    Porosity: [
      22.738896114945018,
      17.965933110311177,
      10.000000000000002,
      21.899304036342635,
      14.943441307048241
    ];
    "Structural setting": {
      FORELAND: 1;
      RIFT: 2;
      THRUST: 1;
      WRENCH: 1;
    };
    Depth: [
      1712.5262616159412,
      3248.380877700295,
      172.67740527282513,
      1957.9938409542565,
      2962.492668057016
    ];
  }; */
}
