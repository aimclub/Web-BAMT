declare namespace AuthFormsModuleScssNamespace {
  export interface IAuthFormsModuleScss {
    error: string;
    input: string;
    root: string;
    title: string;
  }
}

declare const AuthFormsModuleScssModule: AuthFormsModuleScssNamespace.IAuthFormsModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: AuthFormsModuleScssNamespace.IAuthFormsModuleScss;
};

export = AuthFormsModuleScssModule;
