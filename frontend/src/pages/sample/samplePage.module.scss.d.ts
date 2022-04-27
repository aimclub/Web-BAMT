declare namespace SamplePageModuleScssNamespace {
  export interface ISamplePageModuleScss {
    info: string;
    root: string;
    text: string;
    title: string;
  }
}

declare const SamplePageModuleScssModule: SamplePageModuleScssNamespace.ISamplePageModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: SamplePageModuleScssNamespace.ISamplePageModuleScss;
};

export = SamplePageModuleScssModule;
