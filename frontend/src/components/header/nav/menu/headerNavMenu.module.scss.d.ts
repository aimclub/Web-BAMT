declare namespace HeaderNavMenuModuleScssNamespace {
  export interface IHeaderNavMenuModuleScss {
    active: string;
    link: string;
    menu: string;
    root: string;
    text: string;
    title: string;
  }
}

declare const HeaderNavMenuModuleScssModule: HeaderNavMenuModuleScssNamespace.IHeaderNavMenuModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: HeaderNavMenuModuleScssNamespace.IHeaderNavMenuModuleScss;
};

export = HeaderNavMenuModuleScssModule;
