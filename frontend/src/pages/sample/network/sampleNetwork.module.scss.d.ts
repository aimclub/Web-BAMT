declare namespace SampleNetworkModuleScssNamespace {
  export interface ISampleNetworkModuleScss {
    item: string;
    list: string;
    title: string;
  }
}

declare const SampleNetworkModuleScssModule: SampleNetworkModuleScssNamespace.ISampleNetworkModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: SampleNetworkModuleScssNamespace.ISampleNetworkModuleScss;
};

export = SampleNetworkModuleScssModule;
