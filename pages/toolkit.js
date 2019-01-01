import { withRouter } from 'next/router'
import { Query } from 'react-apollo'
import ErrorMessage from '../components/ErrorMessage'
import Loader from '../components/Loader'
import Masthead from '../components/Masthead'
import ToolkitArticle from '../components/ToolkitArticle'
import { getComponent, throw404 } from '../lib/helpers'
import toolkitQuery from '../queries/toolkit.graphql'
import Layout from '../components/Layout'
import withApollo from '../lib/apollo'

const Page = withRouter(({ router: { query } }) => {
  return (
    <Query query={toolkitQuery} variables={{ lang: 'en-us', uid: query.slug }}>
      {({ loading, error, data: { toolkit } }) => {
        if (error) return <ErrorMessage message="Error loading page." />
        if (loading)
          return (
            <Layout>
              <Loader loading />
            </Layout>
          )
        if (!toolkit) return throw404()
        const {
          title,
          description,
          image,
          aside,
          main,
          body,
          meta_title,
          meta_description
        } = toolkit
        return (
          <Layout
            title={meta_title && `thinkfwd | ${meta_title[0].text}`}
            description={meta_description && meta_description[0].text}>
            <Masthead image={image} title={title} description={description} />
            <ToolkitArticle aside={aside} main={main} />
            {body && body.map(component => getComponent(component))}
          </Layout>
        )
      }}
    </Query>
  )
})

export default withApollo(Page)
