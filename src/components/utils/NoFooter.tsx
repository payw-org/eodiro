import $gf from '@/components/global/GlobalFooter/style.module.scss'
import Head from 'next/head'

export default function NoFooter(): JSX.Element {
  return (
    <Head>
      <style>{`
#${$gf['global-footer']} {
  display: none !important;
}
`}</style>
    </Head>
  )
}
