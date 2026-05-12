import LazyImage from '@/components/LazyImage'
import SmartLink from '@/components/SmartLink'
import Card from './Card'

/**
 * 品牌故事区块
 */
const BrandStorySection = ({
  title,
  description,
  buttonText,
  buttonLink,
  footer,
  imagePrimary,
  imageSecondary
}) => {
  if (!title && !description) {
    return <></>
  }

  return (
    <div className='w-full mt-8 border-black'>
      <div className='relative px-6 py-14 md:px-10 md:py-20 dark:text-gray-300'>
        <div className='mx-auto max-w-4xl text-center'>
          {title && (
            <div
              className='text-xl md:text-3xl leading-tight'
              style={{ fontFamily: '"Cormorant Garamond", "Times New Roman", serif' }}>
              {title}
            </div>
          )}
          {description && (
            <div
              className='mt-5 text-base md:text-xl leading-relaxed text-gray-700'
              style={{ fontFamily: '"Cormorant Garamond", "Times New Roman", serif' }}>
              {description}
            </div>
          )}
        </div>

        <div className='relative mx-auto mt-10 h-[25rem] max-w-3xl md:h-[30rem]'>
          {imagePrimary && (
            <div className='absolute left-[8%] top-[4%] w-[52%] rotate-[-2deg]'>
              <LazyImage
                src={imagePrimary}
                alt='brand-story-primary'
                className='w-full object-contain drop-shadow-2xl'
              />
            </div>
          )}
          {imageSecondary && (
            <div className='absolute right-[6%] top-[36%] w-[52%] rotate-[5deg]'>
              <LazyImage
                src={imageSecondary}
                alt='brand-story-secondary'
                className='w-full object-contain drop-shadow-2xl'
              />
            </div>
          )}
        </div>

        <div className='mx-auto max-w-4xl text-center'>
          {footer && (
            <div
              className='text-xl md:text-3xl leading-tight'
              style={{ fontFamily: '"Cormorant Garamond", "Times New Roman", serif' }}>
              {footer}
            </div>
          )}
        </div>

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
