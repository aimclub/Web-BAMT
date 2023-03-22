declare namespace DataDatasetsModuleScssNamespace {
  export interface IDataDatasetsModuleScss {
    head: string;
    list: string;
    root: string;
    row: string;
  }
}

declare const DataDatasetsModuleScssModule: DataDatasetsModuleScssNamespace.IDataDatasetsModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: DataDatasetsModuleScssNamespace.IDataDatasetsModuleScss;
};

export = DataDatasetsModuleScssModule;
