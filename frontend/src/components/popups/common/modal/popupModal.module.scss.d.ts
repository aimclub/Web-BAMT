declare namespace PopupModalModuleScssNamespace {
  export interface IPopupModalModuleScss {
    button: string;
    content: string;
    head: string;
    root: string;
  }
}

declare const PopupModalModuleScssModule: PopupModalModuleScssNamespace.IPopupModalModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: PopupModalModuleScssNamespace.IPopupModalModuleScss;
};

export = PopupModalModuleScssModule;
