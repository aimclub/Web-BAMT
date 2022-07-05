declare namespace HeaderModuleScssNamespace {
  export interface IHeaderModuleScss {
    head: string;
    item: string;
    link: string;
    list: string;
    logout: string;
  }
}

declare const HeaderModuleScssModule: HeaderModuleScssNamespace.IHeaderModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: HeaderModuleScssNamespace.IHeaderModuleScss;
};

export = HeaderModuleScssModule;
