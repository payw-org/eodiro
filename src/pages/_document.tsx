import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    const devOptions = {}
    const useProdApi = process.env.npm_config_use_prod_api === 'true'
    const useDevApi = process.env.npm_config_use_dev_api === 'true'

    if (useProdApi || useDevApi) {
      devOptions['data-forced-api-enabled'] = ''
    }
    if (useProdApi) {
      devOptions['data-use-prod-api'] = ''
    }
    if (useDevApi) {
      devOptions['data-use-dev-api'] = ''
    }

    return (
      <Html lang="ko" {...devOptions}>
        <Head />
        <body className="dimmed">
          <Main />
          {(useProdApi || useDevApi) && (
            <div className="forced-api-enabled">
              {useProdApi ? 'Prod API' : useDevApi ? 'Dev API' : ''}
            </div>
          )}
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
