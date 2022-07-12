declare namespace HeaderLineModuleScssNamespace {
  export interface IHeaderLineModuleScss {
    icon: string;
    line: string;
    line_geological: string;
    line_home: string;
    line_social: string;
    title: string;
  }
}

declare const HeaderLineModuleScssModule: HeaderLineModuleScssNamespace.IHeaderLineModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: HeaderLineModuleScssNamespace.IHeaderLineModuleScss;
};

export = HeaderLineModuleScssModule;
