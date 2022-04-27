declare namespace SampleсomparisonModuleScssNamespace {
  export interface ISampleсomparisonModuleScss {
    chart: string;
    content: string;
    infо: string;
    root: string;
    title: string;
  }
}

declare const SampleсomparisonModuleScssModule: SampleсomparisonModuleScssNamespace.ISampleсomparisonModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: SampleсomparisonModuleScssNamespace.ISampleсomparisonModuleScss;
};

export = SampleсomparisonModuleScssModule;
