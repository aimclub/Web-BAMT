declare namespace SampleComparisonModuleScssNamespace {
  export interface ISampleComparisonModuleScss {
    chart: string;
    content: string;
    infо: string;
    root: string;
    title: string;
  }
}

declare const SampleComparisonModuleScssModule: SampleComparisonModuleScssNamespace.ISampleComparisonModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: SampleComparisonModuleScssNamespace.ISampleComparisonModuleScss;
};

export = SampleComparisonModuleScssModule;
