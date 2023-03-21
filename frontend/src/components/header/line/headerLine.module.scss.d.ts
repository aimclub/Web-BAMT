declare namespace HeaderLineModuleScssNamespace {
  export interface IHeaderLineModuleScss {
    experiment: string;
    icon: string;
    root: string;
    sample: string;
    title: string;
  }
}

declare const HeaderLineModuleScssModule: HeaderLineModuleScssNamespace.IHeaderLineModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: HeaderLineModuleScssNamespace.IHeaderLineModuleScss;
};

export = HeaderLineModuleScssModule;
