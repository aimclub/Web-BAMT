declare namespace ExperimentFormModuleScssNamespace {
  export interface IExperimentFormModuleScss {
    content: string;
    displayName: string;
    parameter: string;
    root: string;
    switch: string;
    title: string;
  }
}

declare const ExperimentFormModuleScssModule: ExperimentFormModuleScssNamespace.IExperimentFormModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ExperimentFormModuleScssNamespace.IExperimentFormModuleScss;
};

export = ExperimentFormModuleScssModule;
