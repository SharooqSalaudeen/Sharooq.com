import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import { resolve } from 'url'
import { processEnv } from '@lib/processEnv'
import { siteIcon } from '@components/meta/siteDefaults'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    return await super.getInitialProps(ctx)
  }

  render() {
    const { pageProps } = this.props.__NEXT_DATA__.props
    const { cmsData, settings } = pageProps || { cmsData: null, settings: null }
    const { settings: cmsSettings, bodyClass } = cmsData || { settings: null, bodyClass: '' }
    const { lang } = settings || cmsSettings || { lang: 'en' }

    return (
      <Html {...{ lang, className: 'casper' }}>
        <Head>
          {!process.env.IS_EXPORT && <link rel="alternate" type="application/rss+xml" title="Sharooq RSS Feed" href={`${resolve(processEnv.siteUrl, 'rss.xml')}`} />}
          <link rel="shortcut icon" href={siteIcon} />
        </Head>
        <body {...{ className: bodyClass }}>
          <script
            dangerouslySetInnerHTML={{
              __html: `
            (function(){
                window.isDark = localStorage.getItem('dark');
                if ( window.isDark === 'dark' ) {
                  document.body.classList.add('dark')
                } else if( window.isDark === undefined && window.matchMedia('(prefers-color-scheme: dark)').matches === true ){
                  document.body.classList.add('dark')
                }
            })()
          `,
            }}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
