declare namespace NetworksListModuleScssNamespace {
  export interface INetworksListModuleScss {
    error: string;
    list: string;
    root: string;
    text: string;
    title: string;
  }
}

declare const NetworksListModuleScssModule: NetworksListModuleScssNamespace.INetworksListModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: NetworksListModuleScssNamespace.INetworksListModuleScss;
};

export = NetworksListModuleScssModule;
