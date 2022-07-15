declare namespace HeaderMenuModuleScssNamespace {
  export interface IHeaderMenuModuleScss {
    auth: string;
    email: string;
  }
}

declare const HeaderMenuModuleScssModule: HeaderMenuModuleScssNamespace.IHeaderMenuModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: HeaderMenuModuleScssNamespace.IHeaderMenuModuleScss;
};

export = HeaderMenuModuleScssModule;
