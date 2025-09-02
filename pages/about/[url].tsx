import { PageOptions } from '@graphcommerce/framer-next-pages'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { GetStaticProps, LayoutOverlayHeader, LayoutTitle, PageMeta } from '@graphcommerce/next-ui'
import type { GetStaticPaths } from 'next'
import { LayoutDocument, LayoutNavigation, LayoutNavigationProps } from '../../components'
import { graphqlSharedClient, graphqlSsrClient } from '../../lib/graphql/graphqlSsrClient'

type GetPageStaticProps = GetStaticProps<LayoutNavigationProps>

function AboutUs() {
  return (
    <>
      <LayoutOverlayHeader>
        <LayoutTitle size='small' component='span'>
          About us
        </LayoutTitle>

        <LayoutTitle size='small' component='span'>
          About us 2
        </LayoutTitle>

            <LayoutTitle size='small' component='span'>
          About us 3 test
        </LayoutTitle>

      </LayoutOverlayHeader>
      <PageMeta title='About us' />
      <LayoutTitle>About us</LayoutTitle>
    </>
  )
}

const pageOptions: PageOptions<LayoutNavigationProps> = {
  Layout: LayoutNavigation,
}
AboutUs.pageOptions = pageOptions

export default AboutUs

const hygraphPageContent = async (client: any, url: string) => {
  const data = {
    data: {
      pages: 'da',
    },
  }
  return data
}

export const getStaticPaths: GetStaticPaths = async (context) => ({
  paths: [],
  fallback: 'blocking',
})

export const getStaticProps: GetPageStaticProps = async (context) => {
  const { params } = context
  const client = graphqlSharedClient(context)
  const staticClient = graphqlSsrClient(context)

  const conf = client.query({ query: StoreConfigDocument })
  const page = hygraphPageContent(staticClient, `about/${params?.url}`)
  const layout = staticClient.query({
    query: LayoutDocument,
    fetchPolicy: 'cache-first',
  })

  if (!(await page).data.pages?.[0]) return { notFound: true, revalidate: 60 }

  return {
    props: {
      ...(await page).data,
      ...(await layout).data,
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 60,
  }
}
