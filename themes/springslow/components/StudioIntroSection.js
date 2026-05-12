import LazyImage from '@/components/LazyImage'
import SmartLink from '@/components/SmartLink'
import Card from './Card'

/**
 * 工作室介绍区块
 */
const StudioIntroSection = ({
  eyebrow,
  title,
  description,
  buttonText,
  buttonLink,
  backgroundImage
}) => {
  if (!title && !description) {
    return <></>
  }

  return (
    <div className='w-full mt-8 overflow-hidden dark:text-gray-300'>
      <div className='relative min-h-[420px] md:min-h-[520px]'>
        <LazyImage
          src={backgroundImage}
          alt={title || 'studio-intro'}
          className='absolute inset-0 h-full w-full object-cover'
        />
        <div className='absolute inset-0 bg-black/35' />

        <div className='relative z-10 flex min-h-[420px] md:min-h-[520px] items-center justify-center px-6 py-12'>
          <div className='w-full max-w-4xl text-center text-white'>
            {eyebrow && (
              <div
                className='text-xl md:text-2xl tracking-[0.08em] uppercase'
                style={{ fontFamily: '"Cormorant Garamond", "Times New Roman", serif' }}>
                {eyebrow}
              </div>
            )}

            {title && (
              <div
                className='mt-5 text-3xl md:text-5xl leading-tight'
                style={{ fontFamily: '"Cormorant Garamond", "Times New Roman", serif' }}>
                {title}
              </div>
            )}

            {description && (
              <div
                className='mt-6 mx-auto max-w-3xl text-lg md:text-2xl leading-relaxed'
                style={{ fontFamily: '"Cormorant Garamond", "Times New Roman", serif' }}>
                {description}
              </div>
            )}

            {buttonText && buttonLink && (
              <SmartLink
                href={buttonLink}
                className='mt-8 inline-flex min-w-[240px] md:min-w-[420px] items-center justify-center rounded-full bg-[#8f8877] px-10 py-4 text-base md:text-3xl uppercase tracking-[0.08em] text-white transition-opacity duration-300 hover:opacity-90'>
                {buttonText}
              </SmartLink>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudioIntroSection
