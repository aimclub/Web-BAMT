declare namespace SpinnerProgressModuleScssNamespace {
  export interface ISpinnerProgressModuleScss {
    "lds-spinner": string;
    root: string;
    spiner: string;
    timer: string;
  }
}

declare const SpinnerProgressModuleScssModule: SpinnerProgressModuleScssNamespace.ISpinnerProgressModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: SpinnerProgressModuleScssNamespace.ISpinnerProgressModuleScss;
};

export = SpinnerProgressModuleScssModule;
