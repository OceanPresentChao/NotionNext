import { BeiAnGongAn } from '@/components/BeiAnGongAn'
import { siteConfig } from '@/lib/config'

const Footer = ({ title }) => {
  const d = new Date()
  const currentYear = d.getFullYear()
  const copyrightDate = (function () {
    if (
      Number.isInteger(siteConfig('SINCE')) &&
      siteConfig('SINCE') < currentYear
    ) {
      return siteConfig('SINCE') + '-' + currentYear
    }
    return currentYear
  })()

  return (
    <footer className='relative z-10 flex-shrink-0 w-full bg-[#d8d4c9] text-[#1f1d1a] dark:bg-[#1f1d1a] dark:text-[#e6e0d2]'>
      <div className='mx-auto flex w-full max-w-6xl flex-col items-center justify-center px-6 py-20 text-center'>
        <h1
          className='text-5xl md:text-6xl leading-none'
          style={{ fontFamily: '"Cormorant Garamond", "Times New Roman", serif' }}>
          {title}
        </h1>

        <div
          className='mt-8 text-xl md:text-3xl uppercase tracking-[0.08em] leading-[1.3]'
          style={{ fontFamily: '"Cormorant Garamond", "Times New Roman", serif' }}>
          {copyrightDate} · {siteConfig('AUTHOR')}
        </div>

        <div className='mt-10 text-sm md:text-base leading-7 flex items-center justify-center gap-2 flex-wrap text-gray-500'>
          {siteConfig('BEI_AN') && (
            <>
              <i className='fas fa-shield-alt' />
              <a href={siteConfig('BEI_AN_LINK')} className='mr-1'>
                {siteConfig('BEI_AN')}
              </a>
            </>
          )}

          {siteConfig('BEI_AN_GONGAN') && <BeiAnGongAn />}

          <div>
            <span>
              {copyrightDate}{' '}
            </span>
            <i className='fas fa-copyright' /> 
          </div>

          <div>
            <a
              target='_blank'
              href={siteConfig('LINK')}
              className='font-semi dark:text-[#e6e0d2]'>
              {siteConfig('AUTHOR')}
            </a>
          </div>


        </div>
      </div>
    </footer>
  )
}

export default Footer
