import LazyImage from '@/components/LazyImage'
import SmartLink from '@/components/SmartLink'
import Card from './Card'
import CONFIG from '../config'
import { siteConfig } from '@/lib/config'

/**
 * 品牌故事区块
 */
const BrandStorySection = ({
}) => {
  const brandStoryTitle = siteConfig(
    'SPRINGSLOW_PORTFOLIO_BRAND_STORY_TITLE',
    '',
    CONFIG
  )
  const brandStoryDesc = siteConfig(
    'SPRINGSLOW_PORTFOLIO_BRAND_STORY_DESC',
    '',
    CONFIG
  )
  const brandStoryFooter = siteConfig(
    'SPRINGSLOW_PORTFOLIO_BRAND_STORY_FOOTER',
    '',
    CONFIG
  )
  const brandStoryButtonText = siteConfig(
    'SPRINGSLOW_PORTFOLIO_BRAND_STORY_BUTTON_TEXT',
    '',
    CONFIG
  )
  const brandStoryButtonUrl = siteConfig(
    'SPRINGSLOW_PORTFOLIO_BRAND_STORY_BUTTON_URL',
    '',
    CONFIG
  )
  const brandStoryImage1 = siteConfig(
    'SPRINGSLOW_PORTFOLIO_BRAND_STORY_IMAGE_1',
    '',
    CONFIG
  )
  const brandStoryImage2 = siteConfig(
    'SPRINGSLOW_PORTFOLIO_BRAND_STORY_IMAGE_2',
    '',
    CONFIG
  )

  return (
    <div className='w-full mt-8 border-black'>
      <div className='relative px-6 py-7 md:px-10 md:p7-10 dark:text-gray-300'>
        <div className='mx-auto max-w-4xl text-center'>
          {brandStoryTitle && (
            <div
              className='text-xl md:text-3xl leading-tight'
              style={{ fontFamily: '"Cormorant Garamond", "Times New Roman", serif' }}>
              {brandStoryTitle}
            </div>
          )}
          {brandStoryDesc && (
            <div
              className='mt-5 text-base md:text-xl leading-relaxed text-gray-700'
              style={{ fontFamily: '"Cormorant Garamond", "Times New Roman", serif' }}>
              {brandStoryDesc}
            </div>
          )}
        </div>

        {(brandStoryImage1 || brandStoryImage2) && (<div className='relative mx-auto mt-10 h-[25rem] max-w-3xl md:h-[30rem]'>
          {brandStoryImage1 && (
            <div className='absolute left-[8%] top-[4%] w-[52%] rotate-[-2deg]'>
              <LazyImage
                src={brandStoryImage1}
                alt='brand-story-primary'
                className='w-full object-contain drop-shadow-2xl'
              />
            </div>
          )}
          {brandStoryImage2 && (
            <div className='absolute right-[6%] top-[36%] w-[52%] rotate-[5deg]'>
              <LazyImage
                src={brandStoryImage2}
                alt='brand-story-secondary'
                className='w-full object-contain drop-shadow-2xl'
              />
            </div>)}
        </div>)}

        {brandStoryFooter && (
          <div className='mx-auto max-w-4xl text-center mt-5'>
            <div
              className='text-xl md:text-2xl leading-tight'
              style={{ fontFamily: '"Cormorant Garamond", "Times New Roman", serif' }}>
              {brandStoryFooter}
            </div>
          </div>
        )}

        {/* {buttonText && buttonLink && (
          <div className='mt-2 mb-2 flex justify-center'>
            <SmartLink
              href={buttonLink}
              className='inline-flex min-w-[260px] md:min-w-[520px] items-center justify-center rounded-full bg-[#89836f] px-10 py-4 text-xs md:text-base uppercase tracking-[0.2em] text-white transition-opacity duration-300 hover:opacity-90'>
              {buttonText}
            </SmartLink>
          </div>
        )} */}
      </div>
    </div>
  )
}

export default BrandStorySection
