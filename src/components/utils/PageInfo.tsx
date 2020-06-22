import Head from 'next/head'

export type PageInfoProps = {
  title: string
  description: string
  ogImage?: string
}

const PageInfo: React.FC<PageInfoProps> = ({ title, description, ogImage }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content="My page title" key="og-title" />
      <meta property="desciption" content={description} key="description" />
      <meta
        property="og:desciption"
        content={description}
        key="og-desciption"
      />
      {ogImage && <meta property="og:image" content={ogImage} key="og-image" />}
    </Head>
  )
}

export default PageInfo
