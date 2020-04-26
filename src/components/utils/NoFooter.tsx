import Head from 'next/head'

export default function NoFooter(): JSX.Element {
  return (
    <Head>
      <style>{`
      #global-footer {
        display: none !important;
      }
      `}</style>
    </Head>
  )
}
