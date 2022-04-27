declare namespace ExperimentLoaderModuleScssNamespace {
  export interface IExperimentLoaderModuleScss {
    info: string;
    msg: string;
    root: string;
    root_visible: string;
  }
}

declare const ExperimentLoaderModuleScssModule: ExperimentLoaderModuleScssNamespace.IExperimentLoaderModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ExperimentLoaderModuleScssNamespace.IExperimentLoaderModuleScss;
};

export = ExperimentLoaderModuleScssModule;
