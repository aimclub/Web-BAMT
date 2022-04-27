declare namespace TimeProgressModuleScssNamespace {
  export interface ITimeProgressModuleScss {
    "lds-spinner": string;
    root: string;
    spiner: string;
    timer: string;
  }
}

declare const TimeProgressModuleScssModule: TimeProgressModuleScssNamespace.ITimeProgressModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: TimeProgressModuleScssNamespace.ITimeProgressModuleScss;
};

export = TimeProgressModuleScssModule;
