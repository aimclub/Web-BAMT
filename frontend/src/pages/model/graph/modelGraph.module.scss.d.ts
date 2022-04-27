declare namespace ModelGraphModuleScssNamespace {
  export interface IModelGraphModuleScss {
    root: string;
  }
}

declare const ModelGraphModuleScssModule: ModelGraphModuleScssNamespace.IModelGraphModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ModelGraphModuleScssNamespace.IModelGraphModuleScss;
};

export = ModelGraphModuleScssModule;
