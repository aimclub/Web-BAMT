declare namespace MainPageModuleScssNamespace {
  export interface IMainPageModuleScss {
    description: string;
    root: string;
    title: string;
  }
}

declare const MainPageModuleScssModule: MainPageModuleScssNamespace.IMainPageModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: MainPageModuleScssNamespace.IMainPageModuleScss;
};

export = MainPageModuleScssModule;
