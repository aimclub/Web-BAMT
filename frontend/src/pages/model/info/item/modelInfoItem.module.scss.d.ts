declare namespace ModelInfoItemModuleScssNamespace {
  export interface IModelInfoItemModuleScss {
    item: string;
    label: string;
    list: string;
    root: string;
    single: string;
    value: string;
  }
}

declare const ModelInfoItemModuleScssModule: ModelInfoItemModuleScssNamespace.IModelInfoItemModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ModelInfoItemModuleScssNamespace.IModelInfoItemModuleScss;
};

export = ModelInfoItemModuleScssModule;
