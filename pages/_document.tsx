//`this file is rendered only once so it can't have dynamic content - kinda template for the page

import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='pl'>
      <Head  />
      <body className='bg-grey-200'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}