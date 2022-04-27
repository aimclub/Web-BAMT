declare namespace SigninFormModuleScssNamespace {
  export interface ISigninFormModuleScss {
    error: string;
    input: string;
    root: string;
    title: string;
  }
}

declare const SigninFormModuleScssModule: SigninFormModuleScssNamespace.ISigninFormModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: SigninFormModuleScssNamespace.ISigninFormModuleScss;
};

export = SigninFormModuleScssModule;
