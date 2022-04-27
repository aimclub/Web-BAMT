declare namespace ModelPageModuleScssNamespace {
  export interface IModelPageModuleScss {
    box: string;
    graph: string;
    head: string;
    link: string;
    root: string;
    score: string;
    title: string;
    value: string;
  }
}

declare const ModelPageModuleScssModule: ModelPageModuleScssNamespace.IModelPageModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ModelPageModuleScssNamespace.IModelPageModuleScss;
};

export = ModelPageModuleScssModule;
