declare namespace ExperimentBoxModuleScssNamespace {
  export interface IExperimentBoxModuleScss {
    box: string;
    graph: string;
    head: string;
    info: string;
    root: string;
    score: string;
    text: string;
    title: string;
    value: string;
  }
}

declare const ExperimentBoxModuleScssModule: ExperimentBoxModuleScssNamespace.IExperimentBoxModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ExperimentBoxModuleScssNamespace.IExperimentBoxModuleScss;
};

export = ExperimentBoxModuleScssModule;
