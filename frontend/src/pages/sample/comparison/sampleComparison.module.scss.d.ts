declare namespace SampleComparisonModuleScssNamespace {
  export interface ISampleComparisonModuleScss {
    chart: string;
    data: string;
    empty: string;
    item: string;
    result: string;
    root: string;
    subtitle: string;
    text: string;
    title: string;
    value: string;
  }
}

declare const SampleComparisonModuleScssModule: SampleComparisonModuleScssNamespace.ISampleComparisonModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: SampleComparisonModuleScssNamespace.ISampleComparisonModuleScss;
};

export = SampleComparisonModuleScssModule;
