import type { PageOptions } from '@graphcommerce/framer-next-pages'
import { cacheFirst } from '@graphcommerce/graphql'
import {
  ProductListDocument,
  ProductListQuery,
  ProductPageName,
} from '@graphcommerce/magento-product'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import type { GetStaticProps } from '@graphcommerce/next-ui'
import {
  breakpointVal,
  HeroBanner,
  LayoutHeader,
  LayoutTitle,
  MetaRobots,
  PageMeta,
} from '@graphcommerce/next-ui'
import { Button, Container, Grid, styled, Typography } from '@mui/material'
import type { LayoutNavigationProps } from '../../components'
import { LayoutDocument, LayoutNavigation } from '../../components'

type Props = {}
type RouteProps = { url: string }
type GetPageStaticProps = GetStaticProps<LayoutNavigationProps, Props, RouteProps>

const AnimatedButton = styled(Button, { name: 'animatedButton' })(({ theme }) => ({
  '@keyframes pulse': {
    '0%': {
      boxShadow: `0 0 0 0 ${theme.palette.primary.main}`,
    },
    '100%': {
      boxShadow: `0 0 0 15px ${theme.palette.background.default}`,
    },
  },
  animation: 'pulse 1.5s infinite',
}))

function TestPage() {
  return (
    <>
      <Grid
        sx={{
          paddingLeft: '2rem',
        }}
      >
        <Typography variant='h1' sx={{ paddingBottom: '3rem' }}>
          Test page
        </Typography>

        <AnimatedButton color='primary' variant='contained'>
          <Typography>Test button</Typography>
        </AnimatedButton>

        <Button color="primary">da</Button>
        
      </Grid>
    </>
  )
}

TestPage.pageOptions = {
  Layout: LayoutNavigation,
} as PageOptions

export default TestPage
