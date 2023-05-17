declare namespace HeaderUserModuleScssNamespace {
  export interface IHeaderUserModuleScss {
    auth: string;
    email: string;
  }
}

declare const HeaderUserModuleScssModule: HeaderUserModuleScssNamespace.IHeaderUserModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: HeaderUserModuleScssNamespace.IHeaderUserModuleScss;
};

export = HeaderUserModuleScssModule;
