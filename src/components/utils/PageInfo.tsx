import Head from 'next/head'

export type PageInfoProps = {
  title: {
    subject: string
    /** When enabled, concatenate the prefix "어디로 -" */
    onlySubject?: boolean
    feature?: string
  }
  description?: string
  ogImage?: string
}

const PageInfo: React.FC<PageInfoProps> = ({
  title,
  description = '',
  ogImage,
}) => {
  const { onlySubject = false } = title
  const builtTitle = onlySubject
    ? `${title.subject}`
    : `${title.subject} | 어디로${title.feature ? ` - ${title.feature}` : ''}`

  return (
    <Head>
      <title>{builtTitle}</title>
      <meta property="og:title" content={builtTitle} key="og-title" />
      <meta name="description" content={description} key="description" />
      <meta
        property="og:description"
        content={description}
        key="og-description"
      />
      {ogImage && <meta property="og:image" content={ogImage} key="og-image" />}
    </Head>
  )
}

export default PageInfo
