declare namespace AppSelectModuleScssNamespace {
  export interface IAppSelectModuleScss {
    btn: string;
    disabled: string;
    error: string;
    helperText: string;
    item: string;
    label: string;
    labelGroup: string;
    root: string;
    select: string;
  }
}

declare const AppSelectModuleScssModule: AppSelectModuleScssNamespace.IAppSelectModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: AppSelectModuleScssNamespace.IAppSelectModuleScss;
};

export = AppSelectModuleScssModule;
