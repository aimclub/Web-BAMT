declare namespace AppHeaderLineModuleScssNamespace {
  export interface IAppHeaderLineModuleScss {
    icon: string;
    line: string;
    line_geological: string;
    line_home: string;
    line_social: string;
    title: string;
  }
}

declare const AppHeaderLineModuleScssModule: AppHeaderLineModuleScssNamespace.IAppHeaderLineModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: AppHeaderLineModuleScssNamespace.IAppHeaderLineModuleScss;
};

export = AppHeaderLineModuleScssModule;
