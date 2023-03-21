declare namespace DataNetworksModuleScssNamespace {
  export interface IDataNetworksModuleScss {
    list: string;
    title: string;
  }
}

declare const DataNetworksModuleScssModule: DataNetworksModuleScssNamespace.IDataNetworksModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: DataNetworksModuleScssNamespace.IDataNetworksModuleScss;
};

export = DataNetworksModuleScssModule;
