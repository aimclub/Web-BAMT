declare namespace TextFieldUnderlineModuleScssNamespace {
  export interface ITextFieldUnderlineModuleScss {
    label: string;
    root: string;
  }
}

declare const TextFieldUnderlineModuleScssModule: TextFieldUnderlineModuleScssNamespace.ITextFieldUnderlineModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: TextFieldUnderlineModuleScssNamespace.ITextFieldUnderlineModuleScss;
};

export = TextFieldUnderlineModuleScssModule;
