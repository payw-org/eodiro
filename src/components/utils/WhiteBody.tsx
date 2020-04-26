import Head from 'next/head'

export const SeamlessBG: React.FC = () => {
  return (
    <Head>
      <style>{`
        body {
          background-color: white !important;
        }

        @media (prefers-color-scheme: dark) {
          body {
            background-color: black !important;
          }
        }
      `}</style>
    </Head>
  )
}

export default SeamlessBG
