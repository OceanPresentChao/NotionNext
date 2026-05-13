import SmartLink from '@/components/SmartLink'
import LazyImage from '@/components/LazyImage'
import Card from './Card'
import CONFIG from '../config'
import { siteConfig } from '@/lib/config'

/**
 * 作品集首页分类入口（动态读取 Notion 分类）
 */
const PortfolioCategorySection = ({ categoryOptions = [], allNavPages = [], siteInfo }) => {
  if (!categoryOptions || categoryOptions.length === 0) {
    return <></>
  }

  const title = siteConfig('SPRINGSLOW_PORTFOLIO_CATEGORY_TITLE', '', CONFIG)
  const desc = siteConfig('SPRINGSLOW_PORTFOLIO_CATEGORY_DESC', '', CONFIG)

  return (
    <Card className='w-full mt-8'>
      <div className='px-1 py-2'>
        <div className='text-2xl md:text-3xl font-semibold text-center'>
          {title}
        </div>
        <div className='text-center text-gray-500 dark:text-gray-400 mt-2'>
          {desc}
        </div>

        <div className='mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4'>
          {categoryOptions.map((category, index) => {
            const coverPost = (allNavPages || []).find(
              post => post?.category === category.name
            )
            const delay = (index % 3) * 300
            return (
              <SmartLink
                key={category.name}
                href={`/category/${category.name}`}
                className='group block'>
                <div
                  data-aos='zoom-in'
                  data-aos-duration='500'
                  data-aos-delay={delay}
                  data-aos-once='true'
                  data-aos-anchor-placement='top-bottom'
                  className='w-full overflow-hidden shadow-md border dark:border-black rounded-xl bg-white dark:bg-hexo-black-gray'>
                  <div className='relative h-80 overflow-hidden'>
                    <LazyImage
                      src={coverPost?.pageCoverThumbnail || siteInfo?.pageCover}
                      alt={category.name}
                      className='h-full w-full object-cover group-hover:scale-110 duration-500'
                    />
                    <div className='absolute inset-0 bg-black/35' />
                    <div className='absolute inset-0 flex items-center justify-center p-4 text-white pointer-events-none'>
                      <div
                        className='text-3xl md:text-4xl font-medium text-center underline decoration-1 tracking-[0.08em]'
                        style={{ fontFamily: '"Cormorant Garamond", "Times New Roman", serif',"textUnderlineOffset": '1rem' }}>
                        {category.name}
                      </div>
                    </div>
                  </div>

                  {/* <div className='px-4 py-3 flex items-center justify-between text-sm'>
                    <div className='text-gray-500 dark:text-gray-400'>
                      {coverPost?.title ? `代表作品：${coverPost.title}` : '查看该分类全部作品'}
                    </div>
                    <div className='text-green-600 dark:text-green-400 font-semibold'>
                      {category.count}
                    </div>
                  </div> */}
                </div>
              </SmartLink>
            )
          })}
        </div>
      </div>
    </Card>
  )
}

export default PortfolioCategorySection
