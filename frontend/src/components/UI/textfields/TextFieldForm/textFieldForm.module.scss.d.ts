declare namespace TextFieldFormModuleScssNamespace {
  export interface ITextFieldFormModuleScss {
    label: string;
    root: string;
  }
}

declare const TextFieldFormModuleScssModule: TextFieldFormModuleScssNamespace.ITextFieldFormModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: TextFieldFormModuleScssNamespace.ITextFieldFormModuleScss;
};

export = TextFieldFormModuleScssModule;
