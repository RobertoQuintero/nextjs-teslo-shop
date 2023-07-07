import Head from "next/head"

interface Props{
  children: JSX.Element | JSX.Element[]
  title: string
  pageDescription: string
  imageFullUrl?: string
}
export const ShopLayout = ({children,pageDescription,title,imageFullUrl}:Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={pageDescription} />

        <meta name="og:title" content={title} />
        <meta name="og:description" content={pageDescription} />
        {

          imageFullUrl && <meta name="og:image" content={imageFullUrl} />
        }
      </Head>
      
      <nav>
      {/* navbar */}
      </nav>
      {/* sidebar */}
      <main style={{
        margin:'80px auto',
        maxWidth:'1440px',
        padding: '0 30px'
      }}>
        {
          children
        }
      </main>

      <footer>

      </footer>
    </>
  )
}
