export type ModelType = "social" | "geological";
export type SimulationType = "example" | "experiment";

export interface IParameters {
  name?: string;
  description?: string;
  logit: boolean;
  mixture: boolean;
  // score_function: "K2" | "BIC" | "MI" | "BICGMM";
  score_function: string;
  root_nodes: string[];
}

export const SCORE_FUNCTION_VALUES = ["K2", "BIC", "MI", "BICGMM"];

export const NODES = {
  social: [
    "age",
    "sex",
    "has_pets",
    "has_high_education",
    "is_parent",
    "relation",
    "is_driver",
    "tr_per_month",
    "median_tr",
    "mean_tr",
    "cash_sum",
  ],
  geological: [
    "Tectonic regime",
    "Period",
    "Lithology",
    "Structural setting",
    "Gross",
    "Netpay",
    "Porosity",
    "Permeability",
    "Depth",
  ],
};

// Parameters:

// Logit (True/False)
// Mixture (True/False)
// Score function  - это выпадающий список с названиями(K2, BIC, MI, BICGMM) - выбирается всегда одно значение
// Root nodes - это выпадающий список с названиями узлов, здесь надо сделать, чтобы мы могли выбрать несколько названий узлов из списка

// Названия и количество узлов фиксированы для Social Dataset и Hackathon Dataset:

// Social dataset:
// [] - 11 узлов

// Hackathon dataset (только давайте назовём его Geological dataset, так как это по сути геологический датасет)
// [] - 9 узлов
