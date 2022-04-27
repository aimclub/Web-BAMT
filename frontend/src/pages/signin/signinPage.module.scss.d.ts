declare namespace SigninPageModuleScssNamespace {
  export interface ISigninPageModuleScss {
    foot: string;
    footLink: string;
    logo: string;
    paper: string;
    root: string;
    title: string;
  }
}

declare const SigninPageModuleScssModule: SigninPageModuleScssNamespace.ISigninPageModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: SigninPageModuleScssNamespace.ISigninPageModuleScss;
};

export = SigninPageModuleScssModule;
