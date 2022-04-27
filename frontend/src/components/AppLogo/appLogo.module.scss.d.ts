declare namespace AppLogoModuleScssNamespace {
  export interface IAppLogoModuleScss {
    logo: string;
  }
}

declare const AppLogoModuleScssModule: AppLogoModuleScssNamespace.IAppLogoModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: AppLogoModuleScssNamespace.IAppLogoModuleScss;
};

export = AppLogoModuleScssModule;
