declare namespace SampleNetworkItemModuleScssNamespace {
  export interface ISampleNetworkItemModuleScss {
    graph: string;
    head: string;
    info: string;
    node: string;
    score: string;
    select: string;
    title: string;
    value: string;
  }
}

declare const SampleNetworkItemModuleScssModule: SampleNetworkItemModuleScssNamespace.ISampleNetworkItemModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: SampleNetworkItemModuleScssNamespace.ISampleNetworkItemModuleScss;
};

export = SampleNetworkItemModuleScssModule;
