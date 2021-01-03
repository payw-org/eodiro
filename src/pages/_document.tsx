import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'

class MyDocument extends Document {
  static isDevice = false

  static async getInitialProps(ctx: DocumentContext) {
    if (ctx.req?.headers['eodiro-agent']) {
      MyDocument.isDevice = true
    } else {
      MyDocument.isDevice = false
    }

    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="ko" className={MyDocument.isDevice ? 'is-device' : ''}>
        <Head />
        <Main />
        <NextScript />
      </Html>
    )
  }
}

export default MyDocument
