declare namespace AppOutletModuleScssNamespace {
  export interface IAppOutletModuleScss {
    main: string;
    root: string;
  }
}

declare const AppOutletModuleScssModule: AppOutletModuleScssNamespace.IAppOutletModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: AppOutletModuleScssNamespace.IAppOutletModuleScss;
};

export = AppOutletModuleScssModule;
