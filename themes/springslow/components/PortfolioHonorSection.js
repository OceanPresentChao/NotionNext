import SmartLink from '@/components/SmartLink'
import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import CONFIG from '../config'
import Card from './Card'

/**
 * 作品集首页荣誉前置区（按 Tag 动态筛选）
 */
const PortfolioHonorSection = ({ allNavPages = [], siteInfo }) => {
  const honorTag = siteConfig('SPRINGSLOW_PORTFOLIO_HONOR_TAG', '荣誉', CONFIG)
  const honorLimit = Number(
    siteConfig('SPRINGSLOW_PORTFOLIO_HONOR_LIMIT', 6, CONFIG)
  )

  const honorPosts = (allNavPages || [])
    .filter(post => Array.isArray(post?.tags) && post.tags.includes(honorTag))
    .slice(0, Number.isNaN(honorLimit) ? 6 : honorLimit)

  if (honorPosts.length === 0) {
    return <></>
  }

  return (
    <Card className='w-full mt-8'>
      <div className='px-3 py-2'>
        <div className='text-2xl md:text-3xl font-semibold text-center'>
          荣誉作品
        </div>
        <div className='text-center text-sm text-gray-500 dark:text-gray-400 mt-2'>
          标签“{honorTag}”作品优先展示
        </div>

        <div className='mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
          {honorPosts.map(post => (
            <SmartLink
              key={post.id}
              href={post.href}
              className='rounded-xl border dark:border-gray-700 overflow-hidden group hover:shadow-lg transition-all duration-200'>
              <div className='h-44 overflow-hidden bg-gray-100 dark:bg-gray-900'>
                <LazyImage
                  src={post.pageCoverThumbnail || siteInfo?.pageCover}
                  alt={post.title}
                  className='h-full w-full object-cover group-hover:scale-105 duration-500'
                />
              </div>
              <div className='p-4'>
                <div className='line-clamp-2 font-semibold text-base group-hover:text-indigo-600 dark:group-hover:text-indigo-400'>
                  {post.title}
                </div>
                <div className='mt-2 text-xs text-gray-500 dark:text-gray-400'>
                  {post.category || '未分类'}
                </div>
              </div>
            </SmartLink>
          ))}
        </div>
      </div>
    </Card>
  )
}

export default PortfolioHonorSection
