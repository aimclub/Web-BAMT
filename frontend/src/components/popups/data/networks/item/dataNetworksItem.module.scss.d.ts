declare namespace DataNetworksItemModuleScssNamespace {
  export interface IDataNetworksItemModuleScss {
    name: string;
    root: string;
  }
}

declare const DataNetworksItemModuleScssModule: DataNetworksItemModuleScssNamespace.IDataNetworksItemModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: DataNetworksItemModuleScssNamespace.IDataNetworksItemModuleScss;
};

export = DataNetworksItemModuleScssModule;
