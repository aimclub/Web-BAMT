declare namespace HomePageModuleScssNamespace {
  export interface IHomePageModuleScss {
    article: string;
    articleContent: string;
    article_geological: string;
    article_social: string;
    content: string;
    description: string;
    heading: string;
    info: string;
    line: string;
    link: string;
    link_light: string;
    name: string;
    root: string;
    title: string;
    title_geological: string;
    title_social: string;
  }
}

declare const HomePageModuleScssModule: HomePageModuleScssNamespace.IHomePageModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: HomePageModuleScssNamespace.IHomePageModuleScss;
};

export = HomePageModuleScssModule;
