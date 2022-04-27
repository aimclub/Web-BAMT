declare namespace ExperimentPageModuleScssNamespace {
  export interface IExperimentPageModuleScss {
    root: string;
  }
}

declare const ExperimentPageModuleScssModule: ExperimentPageModuleScssNamespace.IExperimentPageModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ExperimentPageModuleScssNamespace.IExperimentPageModuleScss;
};

export = ExperimentPageModuleScssModule;
