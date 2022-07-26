declare namespace RingProgressModuleScssNamespace {
  export interface IRingProgressModuleScss {
    lds_ring: string;
    ring: string;
    visible: string;
  }
}

declare const RingProgressModuleScssModule: RingProgressModuleScssNamespace.IRingProgressModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: RingProgressModuleScssNamespace.IRingProgressModuleScss;
};

export = RingProgressModuleScssModule;
