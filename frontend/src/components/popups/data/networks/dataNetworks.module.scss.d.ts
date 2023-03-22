declare namespace DataNetworksModuleScssNamespace {
  export interface IDataNetworksModuleScss {
    error: string;
    list: string;
    message: string;
    root: string;
    title: string;
  }
}

declare const DataNetworksModuleScssModule: DataNetworksModuleScssNamespace.IDataNetworksModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: DataNetworksModuleScssNamespace.IDataNetworksModuleScss;
};

export = DataNetworksModuleScssModule;
