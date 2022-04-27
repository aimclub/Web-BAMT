declare namespace AppheaderModuleScssNamespace {
  export interface IAppheaderModuleScss {
    head: string;
    item: string;
    link: string;
    list: string;
    logout: string;
  }
}

declare const AppheaderModuleScssModule: AppheaderModuleScssNamespace.IAppheaderModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: AppheaderModuleScssNamespace.IAppheaderModuleScss;
};

export = AppheaderModuleScssModule;
