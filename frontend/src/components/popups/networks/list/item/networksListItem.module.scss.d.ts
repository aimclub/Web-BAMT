declare namespace NetworksListItemModuleScssNamespace {
  export interface INetworksListItemModuleScss {
    name: string;
    root: string;
  }
}

declare const NetworksListItemModuleScssModule: NetworksListItemModuleScssNamespace.INetworksListItemModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: NetworksListItemModuleScssNamespace.INetworksListItemModuleScss;
};

export = NetworksListItemModuleScssModule;
