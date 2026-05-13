import Comment from '@/components/Comment'
import { AdSlot } from '@/components/GoogleAdsense'
import Live2D from '@/components/Live2D'
import replaceSearchResult from '@/components/Mark'
import NotionPage from '@/components/NotionPage'
import ShareBar from '@/components/ShareBar'
import WWAds from '@/components/WWAds'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { loadWowJS } from '@/lib/plugins/wow'
import { isBrowser } from '@/lib/utils'
import dynamic from 'next/dynamic'
import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useRef } from 'react'
import Announcement from './components/Announcement'
import ArticleAdjacent from './components/ArticleAdjacent'
import ArticleCopyright from './components/ArticleCopyright'
import { ArticleInfo } from './components/ArticleInfo'
import { ArticleLock } from './components/ArticleLock'
import BlogListBar from './components/BlogListBar'
import BlogPostArchive from './components/BlogPostArchive'
import BlogPostListPage from './components/BlogPostListPage'
import BlogPostListScroll from './components/BlogPostListScroll'
import BrandStorySection from './components/BrandStorySection'
import PortfolioHonorSection from './components/PortfolioHonorSection'
import Card from './components/Card'
import CatalogWrapper from './components/CatalogWrapper'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import JumpToCommentButton from './components/JumpToCommentButton'
import PostHero from './components/PostHero'
import PortfolioCategorySection from './components/PortfolioCategorySection'
import StudioIntroSection from './components/StudioIntroSection'
import RightFloatButtons from './components/RightFloatButtons'
import SearchNave from './components/SearchNav'
import TagItemMiddle from './components/TagItemMiddle'
import CONFIG from './config'
import { Style } from './style'

const AlgoliaSearchModal = dynamic(
  () => import('@/components/AlgoliaSearchModal'),
  { ssr: false }
)

// 主题全局状态
const ThemeGlobalSpringSlow = createContext()
export const useSpringSlowGlobal = () => useContext(ThemeGlobalSpringSlow)

/**
 * 基础布局
 * 采用左右两侧布局，移动端使用顶部导航栏
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const LayoutBase = props => {
  const { children, post, siteInfo } = props
  const { fullWidth } = useGlobal()
  const router = useRouter()
  // 加载wow动画
  useEffect(() => {
    loadWowJS()
  }, [])
  const showPortfolioHome =
    router.route === '/'
  const showPortfolioAnnouncement = siteConfig(
    'SPRINGSLOW_PORTFOLIO_SHOW_ANNOUNCEMENT',
    null,
    CONFIG
  )
  const showStudioIntro = siteConfig(
    'SPRINGSLOW_PORTFOLIO_SHOW_STUDIO_INTRO',
    null,
    CONFIG
  )

  const showBrandStory = siteConfig(
    'SPRINGSLOW_PORTFOLIO_SHOW_BRAND_STORY',
    null,
    CONFIG
  )

  const headerSlot =
    siteConfig('SPRINGSLOW_HOME_BANNER_ENABLE', null, CONFIG) &&
      router.route === '/' ? (
      <Hero {...props} />
    ) : post && !fullWidth ? (
      <PostHero {...props} />
    ) : null

  const floatRightBottom = post ? <JumpToCommentButton /> : null

  // Algolia搜索框
  const searchModal = useRef(null)

  return (
    <ThemeGlobalSpringSlow.Provider value={{ searchModal }}>
      <div
        id='theme-springslow'
        className={`${siteConfig('FONT_STYLE')} min-h-screen flex flex-col justify-between bg-hexo-background-gray dark:bg-black w-full scroll-smooth`}>
        <Style />

        {/* 顶部导航栏 */}
        <Header {...props} />

        {/* 顶部嵌入 */}
        {headerSlot}

        <main
          id='wrapper'
          className={`${siteConfig('SPRINGSLOW_HOME_BANNER_ENABLE', null, CONFIG) ? '' : 'pt-20'} flex-1 w-full py-8 md:px-8 lg:px-24 relative`}>
          {/* 嵌入区域 */}
          <div
            id='container-slot'
            className={`w-full ${fullWidth ? '' : 'max-w-6xl'} ${post && ' lg:max-w-3xl 2xl:max-w-4xl '} mt-6 px-3 mx-auto lg:flex lg:space-x-4 justify-center relative z-10`}>
              {showPortfolioHome && showPortfolioAnnouncement && (
                <Announcement {...props} />
              )}

              {showPortfolioHome && showBrandStory && (
                <BrandStorySection/>
              )}
          </div>

          {showPortfolioHome && (
            <PortfolioHonorSection {...props} />
          )}

          <div
            id='container-inner'
            className={`w-full min-h-fit ${fullWidth ? '' : 'max-w-7xl'} mx-auto lg:flex lg:space-x-4 justify-center relative z-10`}>
            {children}
          </div>

          {showPortfolioHome && showStudioIntro && (
            <StudioIntroSection/>
          )}
        </main>

        {/* 左下角悬浮 */}
        <div className='bottom-4 -left-14 fixed justify-end z-40'>
          <Live2D />
        </div>

        {/* 右下角悬浮 */}
        <RightFloatButtons {...props} floatRightBottom={floatRightBottom} />

        {/* 全文搜索 */}
        <AlgoliaSearchModal cRef={searchModal} {...props} />

        {/* 页脚 */}
        <Footer title={siteConfig('TITLE')} />
      </div>
    </ThemeGlobalSpringSlow.Provider>
  )
}

/**
 * 首页
 * 首页就是一个文章列表，但是嵌入了Hero大图和公告
 * @param {*} props
 * @returns
 */
const LayoutIndex = props => {
  const { siteInfo } = props
  const showPortfolioHome = siteConfig('SPRINGSLOW_PORTFOLIO_ENABLE', null, CONFIG)
  const showCategoryEntry = siteConfig(
    'SPRINGSLOW_PORTFOLIO_SHOW_CATEGORY_ENTRY',
    null,
    CONFIG
  )

  return (
    <>
      {showPortfolioHome && showCategoryEntry && (
        <PortfolioCategorySection {...props} />
      )}
      {/* {!showPortfolioHome && <LayoutPostList {...props} />} */}
    </>
  )
}

/**
 * 博客列表
 * @param {*} props
 * @returns
 */
const LayoutPostList = props => {
  return (
    <div className='mt-5'>
      {siteConfig('POST_LIST_STYLE') === 'page' ? (
        <BlogPostListPage {...props} />
      ) : (
        <BlogPostListScroll {...props} />
      )}
    </div>
  )
}

/**
 * 搜搜
 * @param {*} props
 * @returns
 */
const LayoutSearch = props => {
  const { keyword } = props
  const router = useRouter()
  const currentSearch = keyword || router?.query?.s

  useEffect(() => {
    if (currentSearch) {
      replaceSearchResult({
        doms: document.getElementsByClassName('replace'),
        search: keyword,
        target: {
          element: 'span',
          className: 'text-red-500 border-b border-dashed'
        }
      })
    }
  })
  return (
    <>
      {!currentSearch ? (
        <SearchNave {...props} />
      ) : (
        <div id='posts-wrapper'>
          {siteConfig('POST_LIST_STYLE') === 'page' ? (
            <BlogPostListPage {...props} />
          ) : (
            <BlogPostListScroll {...props} />
          )}
        </div>
      )}
    </>
  )
}

/**
 * 归档
 * @param {*} props
 * @returns
 */
const LayoutArchive = props => {
  const { archivePosts } = props
  return (
    <>
      <Card className='w-full mt-8'>
        <div className='mb-10 pb-20 bg-white md:p-12 p-3 min-h-full dark:bg-hexo-black-gray'>
          {Object.keys(archivePosts).map(archiveTitle => (
            <BlogPostArchive
              key={archiveTitle}
              posts={archivePosts[archiveTitle]}
              archiveTitle={archiveTitle}
            />
          ))}
        </div>
      </Card>
    </>
  )
}

/**
 * 文章详情页
 * @param {*} props
 * @returns
 */
const LayoutSlug = props => {
  const { post, lock, validPassword } = props
  const router = useRouter()
  const waiting404 = siteConfig('POST_WAITING_TIME_FOR_404') * 1000
  useEffect(() => {
    // 用js 实现将页面中的多个视频聚合为一个分集的视频
    function combineVideo() {
      // 找到 id 为 notion-article 的元素
      const notionArticle = document.querySelector('#article-wrapper #notion-article')
      if (!notionArticle) return // 如果找不到对应的元素，则退出函数

      // 找到所有的 .notion-asset-wrapper 元素
      const assetWrappers = document.querySelectorAll('.notion-asset-wrapper')
      if (!assetWrappers || assetWrappers.length === 0) return // 如果找不到对应的元素，则退出函数

      // 不要重复创建
      const exists = document.querySelectorAll('.video-wrapper')
      if (exists && exists.length > 0) return

      // 创建视频区块容器元素
      const videoWrapper = document.createElement('div')
      videoWrapper.className =
        'video-wrapper py-1 px-3 bg-gray-100 dark:bg-white dark:text-black mx-auto'

      // 创建走马灯封装容器元素
      const carouselWrapper = document.createElement('div')
      carouselWrapper.classList.add('notion-carousel-wrapper')

      // 创建分集按钮figcaption文本的数组
      const figCaptionValues = []

      // 遍历所有 .notion-asset-wrapper 元素
      assetWrappers.forEach((wrapper, index) => {
        // 检查 .notion-asset-wrapper 元素是否有子元素 figcaption
        const figCaption = wrapper.querySelector('figcaption')

        // 检查 .notion-asset-wrapper 元素是否有 notion-asset-wrapper-video 或 notion-asset-wrapper-embed 类
        if (
          !wrapper.classList.contains('notion-asset-wrapper-video') &&
          !wrapper.classList.contains('notion-asset-wrapper-embed')
        )
          return

        if (!figCaption) return // 如果没有子元素 figcaption，则不处理该元素

        // 获取 figcaption 的文本内容并添加到数组中
        const figCaptionValue = figCaption
          ? figCaption?.textContent?.trim()
          : `P-${index}`
        figCaptionValues.push(figCaptionValue)

        // 创建一个新的 div 元素用于包裹当前的 .notion-asset-wrapper 元素
        const carouselItem = document.createElement('div')
        carouselItem.classList.add('notion-carousel')
        carouselItem.appendChild(wrapper)

        // 如有外链、保存在data-src中
        const iframe = wrapper.querySelector('iframe')
        if (iframe) {
          iframe?.setAttribute('data-src', iframe?.getAttribute('src'))
        }

        // 如果是第一个元素，设置为 active
        if (index === 0) {
          carouselItem.classList.add('active')
        } else {
          iframe?.setAttribute('src', '')
        }

        // 将元素添加到容器中
        carouselWrapper.appendChild(carouselItem)
        // 从 DOM 中移除原始的 .notion-asset-wrapper 元素
        // wrapper.parentNode.removeChild(wrapper)
      })

      // 创建一个用于保存 figcaption 值的容器元素
      const figCaptionWrapper = document.createElement('div')
      figCaptionWrapper.className =
        'notion-carousel-route py-2 max-h-36 overflow-y-auto'

      // 遍历 figCaptionValues 数组，并将每个值添加到容器元素中
      figCaptionValues.forEach(value => {
        const div = document.createElement('div')
        div.textContent = value
        div.addEventListener('click', function () {
          // 遍历所有的 carouselItem 元素
          document.querySelectorAll('.notion-carousel').forEach(item => {
            // 外链保存在data-src中
            const iframe = item.querySelector('iframe')

            // 判断当前元素是否包含该 figCaption 的文本内容，如果是则设置为 active，否则取消 active
            if (item.querySelector('figcaption').textContent.trim() === value) {
              item.classList.add('active')
              if (iframe) {
                iframe.setAttribute('src', iframe.getAttribute('data-src'))
              }
            } else {
              item.classList.remove('active')
              // 不活跃窗口暂停播放，仅支持notion上传视频、不支持外链
              item.querySelectorAll('video')?.forEach(video => {
                video.pause()
              })
              // 外链通过设置src来实现视频暂停播放
              if (iframe) {
                iframe.setAttribute('src', '')
              }
            }
          })
        })
        figCaptionWrapper.appendChild(div)
      })

      if (carouselWrapper.children.length > 0) {
        // 将包含 figcaption 值的容器元素添加到 notion-article 的第一个子元素插入
        videoWrapper.appendChild(carouselWrapper)
        // 显示分集按钮 大于1集才显示 ；或者用户 要求强制显示
        if (
          figCaptionWrapper.children.length > 1 ||
          siteConfig('MOVIE_VIDEO_COMBINE_SHOW_PAGE_FORCE', false, CONFIG)
        ) {
          videoWrapper.appendChild(figCaptionWrapper)
        }
        // 放入页面
        if (
          notionArticle.firstChild &&
          notionArticle.contains(notionArticle.firstChild)
        ) {
          notionArticle.insertBefore(videoWrapper, notionArticle.firstChild)
        } else {
          notionArticle.appendChild(videoWrapper)
        }
      }
    }

    setTimeout(() => {
      combineVideo()
    }, 1500)

    // 404
    if (!post) {
      setTimeout(
        () => {
          if (isBrowser) {
            const article = document.querySelector('#article-wrapper #notion-article')
            if (!article) {
              router.push('/404').then(() => {
                console.warn('找不到页面', router.asPath)
              })
            }
          }
        },
        waiting404
      )
    }
    return () => {
      // 获取所有 class="video-wrapper" 的元素
      const videoWrappers = document.querySelectorAll('.video-wrapper')

      // 遍历所有匹配的元素并移除它们
      videoWrappers.forEach(wrapper => {
        wrapper.parentNode.removeChild(wrapper) // 从 DOM 中移除元素
      })
    }
  }, [post])

  return (
    <>
      {!lock ? post && (
        <div
          id='article-wrapper'
          className='px-2 max-w-5xl 2xl:max-w-[70%] mx-auto'>
          {/* 标题 */}
          <ArticleInfo post={post} />
          {/* 页面元素 */}
          <NotionPage post={post} />

          {<br/>}
          {/* 底部文章推荐 */}
          {post?.type === 'Post' && <ArticleAdjacent {...props} />}

          {/* 底部公告 */}
          {/* <Announcement {...props} /> */}

          {/* 右侧文章目录 */}
          {/* <CatalogWrapper post={post} /> */}

          {/* 评论互动 */}
          <div className='overflow-x-auto dark:bg-hexo-black-gray px-3'>
            <WWAds orientation='horizontal' />
            <Comment frontMatter={post} />
          </div>
        </div>
      ) : (
        <ArticleLock validPassword={validPassword} />
      )}
    </>
  )
}

/**
 * 404
 * @param {*} props
 * @returns
 */
const Layout404 = props => {
  const router = useRouter()
  useEffect(() => {
    // 延时3秒如果加载失败就返回首页
    setTimeout(() => {
      const article =
        typeof document !== 'undefined' &&
        document.querySelector('#article-wrapper #notion-article')
      if (!article) {
        router.push('/').then(() => {
          // console.log('找不到页面', router.asPath)
        })
      }
    }, 3000)
  })
  return (
    <>
      <div className='text-black w-full h-screen text-center justify-center content-center items-center flex flex-col'>
        <div className='dark:text-gray-200'>
          <h2 className='inline-block border-r-2 border-gray-600 mr-2 px-3 py-2 align-top'>
            404
          </h2>
          <div className='inline-block text-left h-32 leading-10 items-center'>
            <h2 className='m-0 p-0'>页面未找到</h2>
          </div>
        </div>
      </div>
    </>
  )
}

/**
 * 分类列表
 * @param {*} props
 * @returns
 */
const LayoutCategoryIndex = props => {
  const { categoryOptions } = props

  return (
    <div id='inner-wrapper' className='w-full'>
      {/* <div className='drop-shadow-xl mt-8 rounded-md mx-3 px-5 lg:border lg:rounded-xl lg:px-2 lg:py-4 bg-white dark:bg-hexo-black-gray  dark:border-black dark:text-gray-300'>
        <div className='flex justify-center flex-wrap'>
          {categoryOptions?.map(e => {
            return (
              <SmartLink
                key={e.name}
                href={`/category/${e.name}`}
                passHref
                legacyBehavior>
                <div className='duration-300 text-md whitespace-nowrap dark:hover:text-white px-5 cursor-pointer py-2 hover:text-green-400'>
                  <i className={'mr-4 fas fa-folder'} /> {e.name}({e.count})
                </div>
              </SmartLink>
            )
          })}
        </div>
      </div> */}
      <PortfolioCategorySection {...props} />
    </div>
  )
}

/**
 * 标签列表
 * @param {*} props
 * @returns
 */
const LayoutTagIndex = props => {
  const { tagOptions } = props
  const { locale } = useGlobal()
  return (
    <div id='inner-wrapper' className='w-full drop-shadow-xl'>
      <div className='mt-8 rounded-md mx-3 px-5 lg:border lg:rounded-xl lg:px-2 lg:py-4 bg-white dark:bg-hexo-black-gray dark:border-black'>
        <div className='dark:text-gray-200 py-5 text-center  text-2xl'>
          <i className='fas fa-tags' /> {locale.COMMON.TAGS}
        </div>

        <div
          id='tags-list'
          className='duration-200 flex flex-wrap justify-center pb-12'>
          {tagOptions.map(tag => {
            return (
              <div key={tag.name} className='p-2'>
                <TagItemMiddle key={tag.name} tag={tag} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export {
  Layout404,
  LayoutArchive,
  LayoutBase,
  LayoutCategoryIndex,
  LayoutIndex,
  LayoutPostList,
  LayoutSearch,
  LayoutSlug,
  LayoutTagIndex,
  CONFIG as THEME_CONFIG
}
