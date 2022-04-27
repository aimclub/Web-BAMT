declare namespace ExperimentParametersModuleScssNamespace {
  export interface IExperimentParametersModuleScss {
    displayName: string;
    form: string;
    item: string;
    root: string;
    title: string;
  }
}

declare const ExperimentParametersModuleScssModule: ExperimentParametersModuleScssNamespace.IExperimentParametersModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ExperimentParametersModuleScssNamespace.IExperimentParametersModuleScss;
};

export = ExperimentParametersModuleScssModule;
