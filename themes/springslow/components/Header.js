import SideBarDrawer from '@/components/SideBarDrawer'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import throttle from 'lodash.throttle'
import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'
import CONFIG from '../config'
import CategoryGroup from './CategoryGroup'
import Logo from './Logo'
import { MenuListTop } from './MenuListTop'
import SearchButton from './SearchButton'
import SearchDrawer from './SearchDrawer'
import SideBar from './SideBar'
import TagGroups from './TagGroups'

let windowTop = 0

/**
 * 顶部导航(页头)
 * @param {*} param0
 * @returns
 */
const Header = props => {
  const { tags, currentTag, categories, currentCategory } = props
  const { locale } = useGlobal()
  const searchDrawer = useRef()
  const { isDarkMode } = useGlobal()
  const throttleMs = 200
  const showSearchButton = siteConfig('SPRINGSLOW_MENU_SEARCH', false, CONFIG)

  const router = useRouter()
  const scrollTrigger = useCallback(
    throttle(() => {
      requestAnimationFrame(() => {
        const scrollS = window.scrollY
        const nav = document.querySelector('#sticky-nav')
        const header = document.querySelector('#header')
        const showNav =
          scrollS <= windowTop ||
          scrollS < 5 ||
          (header && scrollS <= header.clientHeight * 2) // 非首页无大图时影藏顶部 滚动条置顶时隐藏// 非首页无大图时影藏顶部 滚动条置顶时隐藏
        if (!showNav) {
          nav && nav.classList.replace('top-0', '-top-20')
          windowTop = scrollS
        } else {
          nav && nav.classList.replace('-top-20', 'top-0')
          windowTop = scrollS
        }
        navDarkMode()
      })
    }, throttleMs)
  )

  const navDarkMode = () => {
    const nav = document.getElementById('sticky-nav')
    const header = document.querySelector('#header')
    if (!isDarkMode && nav && header) {
      if (window.scrollY < header.clientHeight) {
        nav?.classList?.add('dark')
      } else {
        nav?.classList?.remove('dark')
      }
    }
  }

  // 监听滚动
  useEffect(() => {
    scrollTrigger()

    window.addEventListener('scroll', scrollTrigger)
    return () => {
      window.removeEventListener('scroll', scrollTrigger)
    }
  }, [router])

  const [isOpen, changeShow] = useState(false)

  const toggleMenuOpen = () => {
    changeShow(!isOpen)
  }

  const toggleMenuClose = () => {
    changeShow(false)
  }

  const searchDrawerSlot = (
    <>
      {categories && (
        <section className='mt-8'>
          <div className='text-sm flex flex-nowrap justify-between font-light px-2'>
            <div className='text-gray-600 dark:text-gray-200'>
              <i className='mr-2 fas fa-th-list' />
              {locale.COMMON.CATEGORY}
            </div>
            <SmartLink
              href={'/category'}
              passHref
              className='mb-3 text-gray-400 hover:text-black dark:text-gray-400 dark:hover:text-white hover:underline cursor-pointer'>
              {locale.COMMON.MORE} <i className='fas fa-angle-double-right' />
            </SmartLink>
          </div>
          <CategoryGroup
            currentCategory={currentCategory}
            categories={categories}
          />
        </section>
      )}

      {tags && (
        <section className='mt-4'>
          <div className='text-sm py-2 px-2 flex flex-nowrap justify-between font-light dark:text-gray-200'>
            <div className='text-gray-600 dark:text-gray-200'>
              <i className='mr-2 fas fa-tag' />
              {locale.COMMON.TAGS}
            </div>
            <SmartLink
              href={'/tag'}
              passHref
              className='text-gray-400 hover:text-black  dark:hover:text-white hover:underline cursor-pointer'>
              {locale.COMMON.MORE} <i className='fas fa-angle-double-right' />
            </SmartLink>
          </div>
          <div className='p-2'>
            <TagGroups tags={tags} currentTag={currentTag} />
          </div>
        </section>
      )}
    </>
  )

  return (
    <div id='top-nav'>
      <SearchDrawer cRef={searchDrawer} slot={searchDrawerSlot} />
      {/* 导航栏 */}
      <div
        id='sticky-nav'
        className={
          'flex justify-center top-0 fixed h-[73px] w-full z-30 transform transition-all duration-200 springslow-wedding-nav'
        }>
        <div className='w-full max-w-[1184px] h-full flex justify-between items-center px-4 md:px-8 lg:px-12'>
          {/* 左侧功能 */}
          <div className='justify-start items-center block lg:hidden '>
            <div
              onClick={toggleMenuOpen}
              className='w-8 justify-center items-center h-8 cursor-pointer flex lg:hidden text-white'>
              {isOpen ? (
                <i className='fas fa-times' />
              ) : (
                <i className='fas fa-bars' />
              )}
            </div>
          </div>

          <div className='flex'>
            <Logo {...props} />
          </div>

          {/* 右侧功能 */}
          <div className='mr-1 justify-end items-center flex'>
            <div className='hidden lg:flex items-center'>
              {' '}
              <MenuListTop {...props} />
            </div>
            {showSearchButton && (
              <div className='springslow-nav-search ml-6'>
                <SearchButton />
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        #theme-springslow #sticky-nav.springslow-wedding-nav {
          background: rgb(120 156 152 / 70%);
          backdrop-filter: blur(2px);
        }

        #theme-springslow #sticky-nav .menu-link {
          padding: 0;
          color: #ffffff;
          font-family: 'Geist', sans-serif;
          font-weight: 400;
          font-size: 14px;
          line-height: 120%;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-decoration: underline;
          text-underline-offset: 2px;
          transition: opacity 0.2s ease;
        }

        #theme-springslow #sticky-nav .menu-link:hover {
          opacity: 0.8;
          background: transparent;
        }

        #theme-springslow #sticky-nav #nav {
          width: auto;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 3.9rem;
          line-height: 1;
        }

        #theme-springslow #sticky-nav #nav .menu-link i {
          display: none;
        }

        #theme-springslow #sticky-nav .springslow-nav-search > div {
          color: #ffffff !important;
          width: 32px;
          height: 32px;
        }

        #theme-springslow #sticky-nav .springslow-nav-search > div:hover {
          background: rgba(255, 255, 255, 0.12) !important;
        }

        #theme-springslow #sticky-nav #top-nav,
        #theme-springslow #sticky-nav a,
        #theme-springslow #sticky-nav .text-lg {
          color: #ffffff;
        }
      `}</style>

      <SideBarDrawer isOpen={isOpen} onClose={toggleMenuClose}>
        <SideBar {...props} />
      </SideBarDrawer>
    </div>
  )
}

export default Header
