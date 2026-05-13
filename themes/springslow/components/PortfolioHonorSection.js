import { siteConfig } from '@/lib/config'
import CONFIG from '../config'
import Swiper from '../components/Swiper'

/**
 * 作品集首页荣誉前置区（按 Tag 动态筛选）
 */
const PortfolioHonorSection = (props) => {
  const {posts} = props
  const honorTag = siteConfig('SPRINGSLOW_TOP_TAG', '杰出作品', CONFIG)
  const honorLimit = Number(
    siteConfig('SPRINGSLOW_PORTFOLIO_HONOR_LIMIT', 6, CONFIG)
  )
  console.log(props)

  const honorPosts = (posts || [])
    .filter(post => Array.isArray(post?.tags) && post.tags.includes(honorTag))
    // .slice(0, Number.isNaN(honorLimit) ? 6 : honorLimit)

  if (honorPosts.length === 0) {
    return <></>
  }

  return (
    <div>
      <div className='relative px-6 py-10 md:px-10 md:py-15 dark:text-gray-300'>
        <div className='text-xl md:text-3xl leading-tight text-center'
            style={{ fontFamily: '"Cormorant Garamond", "Times New Roman", serif' }}>
            {honorTag}
        </div>
      </div>
      <Swiper {...props} posts={honorPosts} />
    </div>
  )
}

export default PortfolioHonorSection
