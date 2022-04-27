declare namespace ModelInfoModuleScssNamespace {
  export interface IModelInfoModuleScss {
    additional: string;
    description: string;
    info: string;
    link: string;
    name: string;
    nameLabel: string;
    root: string;
    title: string;
  }
}

declare const ModelInfoModuleScssModule: ModelInfoModuleScssNamespace.IModelInfoModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ModelInfoModuleScssNamespace.IModelInfoModuleScss;
};

export = ModelInfoModuleScssModule;
