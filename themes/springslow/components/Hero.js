// import Image from 'next/image'
import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { loadExternalResource } from '@/lib/utils'
import { useEffect, useState } from 'react'
import CONFIG from '../config'

let wrapperTop = 0

/**
 * 首页英雄区
 * 是一张大图，带个居中按钮
 * @returns 头图
 */
const Hero = props => {
  const [typed, changeType] = useState()
  const { siteInfo } = props
  const { locale } = useGlobal()
  const portfolioEnabled = siteConfig('SPRINGSLOW_PORTFOLIO_ENABLE', null, CONFIG)
  const portfolioTitle = siteConfig(
    'SPRINGSLOW_PORTFOLIO_BRAND_TITLE',
    '',
    CONFIG
  )
  const portfolioSubtitle = siteConfig(
    'SPRINGSLOW_PORTFOLIO_BRAND_SUBTITLE',
    '',
    CONFIG
  )
  const startText = siteConfig('SPRINGSLOW_PORTFOLIO_START_TEXT', '', CONFIG)
  const fallbackCover = siteConfig(
    'SPRINGSLOW_PORTFOLIO_HERO_FALLBACK_COVER',
    '',
    CONFIG
  )
  const GREETING_WORDS = siteConfig('GREETING_WORDS').split(',')
  useEffect(() => {
    updateHeaderHeight()
    if (!typed && window && document.getElementById('typed')) {
      loadExternalResource('/js/typed.min.js', 'js').then(() => {
        if (window.Typed) {
          changeType(
            new window.Typed('#typed', {
              strings: GREETING_WORDS,
              typeSpeed: 200,
              backSpeed: 100,
              backDelay: 400,
              showCursor: true,
              smartBackspace: true
            })
          )
        }
      })
    }

    window.addEventListener('resize', updateHeaderHeight)
    return () => {
      window.removeEventListener('resize', updateHeaderHeight)
    }
  }, [])

  function updateHeaderHeight() {
    requestAnimationFrame(() => {
      const wrapperElement = document.getElementById('wrapper')
      wrapperTop = wrapperElement?.offsetTop
    })
  }

  return (
    <header
      id='header'
      style={{ zIndex: 1 }}
      className=' w-full h-screen relative bg-black'>
      <div className='text-white absolute flex flex-col h-full items-center justify-center w-full '>
        {/* 站点标题 */}
        <div className='text-4xl md:text-5xl shadow-text'>
          {portfolioEnabled
            ? portfolioTitle || siteInfo?.title || siteConfig('TITLE')
            : siteInfo?.title || siteConfig('TITLE')}
        </div>
        {/* 站点欢迎语 */}
        <div className='mt-2 h-12 items-center text-center shadow-text text-white text-lg'>
          {portfolioEnabled && portfolioSubtitle ? (
            <span>{portfolioSubtitle}</span>
          ) : (
            <span id='typed' />
          )}
        </div>
        {/* 滚动按钮 */}
        <div
          onClick={() => {
            window.scrollTo({ top: wrapperTop, behavior: 'smooth' })
          }}
          className='glassmorphism mt-12 border cursor-pointer w-40 text-center pt-4 pb-3 text-md text-white hover:bg-orange-600 duration-300 rounded-3xl z-40'>
          <i className='animate-bounce fas fa-angle-double-down' />{' '}
          <span>
            {portfolioEnabled
              ? startText || locale.COMMON.START_READING
              : siteConfig('SPRINGSLOW_SHOW_START_READING', null, CONFIG) &&
                locale.COMMON.START_READING}
          </span>
        </div>
      </div>

      <LazyImage
        priority={true}
        id='header-cover'
        src={siteInfo?.pageCover || fallbackCover}
        className={`header-cover object-center w-full h-screen object-cover ${siteConfig('SPRINGSLOW_HOME_NAV_BACKGROUND_IMG_FIXED', null, CONFIG) ? 'fixed' : ''}`}
      />
    </header>
  )
}

export default Hero
