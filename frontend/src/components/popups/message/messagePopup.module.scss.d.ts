declare namespace MessagePopupModuleScssNamespace {
  export interface IMessagePopupModuleScss {
    error: string;
    message: string;
  }
}

declare const MessagePopupModuleScssModule: MessagePopupModuleScssNamespace.IMessagePopupModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: MessagePopupModuleScssNamespace.IMessagePopupModuleScss;
};

export = MessagePopupModuleScssModule;
