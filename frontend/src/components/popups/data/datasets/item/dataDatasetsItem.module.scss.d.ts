declare namespace DataDatasetsItemModuleScssNamespace {
  export interface IDataDatasetsItemModuleScss {
    delete: string;
    name: string;
    root: string;
    text: string;
  }
}

declare const DataDatasetsItemModuleScssModule: DataDatasetsItemModuleScssNamespace.IDataDatasetsItemModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: DataDatasetsItemModuleScssNamespace.IDataDatasetsItemModuleScss;
};

export = DataDatasetsItemModuleScssModule;
