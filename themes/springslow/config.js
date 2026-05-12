const CONFIG = {
  SPRINGSLOW_PORTFOLIO_ENABLE: true, // 启用作品集首页结构
  SPRINGSLOW_PORTFOLIO_SHOW_ANNOUNCEMENT: false, // 作品集首页隐藏公告，优先展示荣誉区
  SPRINGSLOW_PORTFOLIO_BRAND_TITLE: '春天树工作室', // 首页品牌主标题
  SPRINGSLOW_PORTFOLIO_BRAND_SUBTITLE: 'AIGC × 品牌形象 × 政府项目 × 艺术影像', // 首页品牌副标题
  SPRINGSLOW_PORTFOLIO_START_TEXT: '进入作品集', // 首页滚动按钮文案
  SPRINGSLOW_PORTFOLIO_HONOR_TAG: '荣誉', // 荣誉作品筛选标签
  SPRINGSLOW_PORTFOLIO_HONOR_LIMIT: 6, // 荣誉作品展示数量
  SPRINGSLOW_PORTFOLIO_SHOW_HONOR: true, // 显示荣誉前置区
  SPRINGSLOW_PORTFOLIO_SHOW_CATEGORY_ENTRY: true, // 显示分类入口区
  SPRINGSLOW_PORTFOLIO_SHOW_STUDIO_INTRO: true, // 显示工作室介绍区
  SPRINGSLOW_PORTFOLIO_STUDIO_EYEBROW: 'STUDIO', // 工作室介绍抬头
  SPRINGSLOW_PORTFOLIO_STUDIO_TITLE: '关于我们', // 工作室介绍标题
  SPRINGSLOW_PORTFOLIO_STUDIO_DESC: '我们以影像叙事与创意技术，持续探索品牌、公共议题与艺术表达的更多可能。', // 工作室介绍描述
  SPRINGSLOW_PORTFOLIO_STUDIO_BUTTON_TEXT: '了解更多', // 工作室介绍按钮文案
  SPRINGSLOW_PORTFOLIO_STUDIO_BUTTON_URL: '/about', // 工作室介绍按钮链接
  SPRINGSLOW_PORTFOLIO_STUDIO_BG_IMAGE: '', // 工作室介绍背景图
  SPRINGSLOW_PORTFOLIO_SHOW_BRAND_STORY: true, // 显示品牌故事区
  SPRINGSLOW_PORTFOLIO_BRAND_STORY_TITLE: '品牌故事', // 品牌故事标题
  SPRINGSLOW_PORTFOLIO_BRAND_STORY_DESC: '我们相信影像不仅记录现实，更能讲述情感、建立连接，并让品牌拥有可被记住的温度。', // 品牌故事描述
  SPRINGSLOW_PORTFOLIO_BRAND_STORY_BUTTON_TEXT: '了解更多', // 品牌故事按钮文案
  SPRINGSLOW_PORTFOLIO_BRAND_STORY_BUTTON_URL: '/about', // 品牌故事按钮链接
  SPRINGSLOW_PORTFOLIO_BRAND_STORY_IMAGE_1: '', // 品牌故事图片1
  SPRINGSLOW_PORTFOLIO_BRAND_STORY_IMAGE_2: '', // 品牌故事图片2
  SPRINGSLOW_PORTFOLIO_HERO_FALLBACK_COVER: '', // 首页头图兜底
  SPRINGSLOW_HOME_BANNER_ENABLE: true,
  // 3.14.1以后的版本中，欢迎语在blog.config.js中配置，用英文逗号','隔开多个。
  SPRINGSLOW_HOME_BANNER_GREETINGS: [
    'Hi，我是一个程序员',
    'Hi，我是一个打工人',
    'Hi，我是一个干饭人',
    '欢迎来到我的博客🎉'
  ], // 首页大图标语文字

  SPRINGSLOW_HOME_NAV_BUTTONS: true, // 首页是否显示分类大图标按钮
  SPRINGSLOW_HOME_NAV_BACKGROUND_IMG_FIXED: false, // 首页背景图滚动时是否固定，true 则滚动时图片不懂； false则随鼠标滚动

  // 是否显示开始阅读按钮
  SPRINGSLOW_SHOW_START_READING: false,

  // 菜单配置
  SPRINGSLOW_MENU_CATEGORY: true, // 显示分类
  SPRINGSLOW_MENU_TAG: true, // 显示标签
  SPRINGSLOW_MENU_ARCHIVE: true, // 显示归档
  SPRINGSLOW_MENU_SEARCH: true, // 显示搜索

  SPRINGSLOW_POST_LIST_COVER: true, // 文章封面
  SPRINGSLOW_POST_LIST_SUMMARY: true, // 文章摘要
  SPRINGSLOW_POST_LIST_PREVIEW: true, // 读取文章预览

  SPRINGSLOW_ARTICLE_ADJACENT: true, // 显示上一篇下一篇文章推荐
  SPRINGSLOW_ARTICLE_COPYRIGHT: true, // 显示文章版权声明
  SPRINGSLOW_ARTICLE_NOT_BY_AI: false, // 显示非AI写作
  SPRINGSLOW_ARTICLE_RECOMMEND: true, // 文章关联推荐

  SPRINGSLOW_WIDGET_LATEST_POSTS: true, // 显示最新文章卡
  SPRINGSLOW_WIDGET_ANALYTICS: false, // 显示统计卡
  SPRINGSLOW_WIDGET_TO_TOP: true,
  SPRINGSLOW_WIDGET_TO_COMMENT: true, // 跳到评论区
  WIDGET_DARK_MODE: true, // 夜间模式
  SPRINGSLOW_WIDGET_TOC: true // 移动端悬浮目录
}
export default CONFIG
