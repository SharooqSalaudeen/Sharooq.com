// import { useEffect } from 'react'
import Script from 'next/script'
import { AppProps } from 'next/app'
// import { useRouter } from 'next/router'
import { OverlayProvider } from '@components/contexts/overlayProvider'
import { ThemeProvider } from '@components/contexts/themeProvider'
import { processEnv } from '@lib/processEnv'
import * as gtag from '../lib/gtag'

import '@styles/home.css'
import '@styles/screen.css'
import '@styles/bookmark-fix.css'
import '@styles/screen-fixings.css'
import '@styles/dark-mode.css'
import '@styles/prism.css'
import '@styles/toc.css'
import '@styles/search.css'
import '@styles/tagfilter.css'

function App({ Component, pageProps }: AppProps) {
  // const router = useRouter()
  const { googleAnalytics } = processEnv

  // useEffect(() => {
  //   const handleRouteChange = (url: string) => {
  //     if (googleAnalytics) {
  //       gtag.pageview(url)
  //     }
  //   }
  //   router.events.on('routeChangeComplete', handleRouteChange)
  //   return () => {
  //     router.events.off('routeChangeComplete', handleRouteChange)
  //   }
  // }, [router.events])

  return (
    <ThemeProvider {...processEnv.darkMode}>
      <OverlayProvider>
        {/* Global site tag (gtag.js) - Google Analytics */}
        {googleAnalytics && (
          <>
            <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`} />
            <Script
              id="gtag-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${gtag.GA_TRACKING_ID}');
              `,
              }}
            />
            <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2618439957297110" crossOrigin="anonymous"></Script>
          </>
        )}
        <Component {...pageProps} />
      </OverlayProvider>
    </ThemeProvider>
  )
}

export default App
