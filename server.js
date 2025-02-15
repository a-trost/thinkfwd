const next = require('next')
const routes = require('./lib/routes')
const PORT = parseInt(process.env.PORT, 10) || 3000
const express = require('express')
const axios = require('axios')
const moment = require('moment')

const app = next({ dev: process.env.NODE_ENV !== 'production' })

const handler = routes.getRequestHandler(
  app,
  async ({ req, res, route, query }) => {
    if (query.slug === 'home') {
      res.redirect('/')
    }
    if (query.slug === 'eventbrite') {
      let result = await axios(
        `https://www.eventbriteapi.com/v3/users/me/events/?token=LNQKPABZUHSPRUPOWZCD&expand=organizer,venue&status=live,canceled,started,ended`
      )
      let newResults = []
      result.data.events.map(event => {
        newResults.push({
          ...event,
          title: event.name.text,
          image_url: event.logo ? event.logo.original.url : null,
          description: event.description.text,
          last_update: parseInt(moment(new Date(event.changed)).format('x')),
          blob: event
        })
      })
      res.json({
        results_size: result.data.events.length,
        results: newResults
      })
    }
    app.render(req, res, route.page, query)
  }
)

const robotsOptions = {
  root: __dirname + '/static/',
  headers: {
    'Content-Type': 'text/plain;charset=UTF-8'
  }
}

const sitemapOptions = {
  root: __dirname + '/static/',
  headers: {
    'Content-Type': 'text/xml;charset=UTF-8'
  }
}

const faviconOptions = {
  root: __dirname + '/static/'
}

app.prepare().then(() => {
  express()
    .get('/robots.txt', (req, res) =>
      res.status(200).sendFile('robots.txt', robotsOptions)
    )
    .get('/sitemap.xml', (req, res) =>
      res.status(200).sendFile('sitemap.xml', sitemapOptions)
    )
    .get('/favicon.ico', (req, res) =>
      res.status(200).sendFile('favicon.ico', faviconOptions)
    )

    .use(handler)
    .listen(PORT, () =>
      process.stdout.write(`Point your browser to: http://localhost:${PORT}\n`)
    )
})
