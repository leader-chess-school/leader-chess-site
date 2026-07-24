import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from './App'

/* SSR entry for build-time prerender. scripts/prerender.mjs imports
   render() from the SSR build of this file and calls it for each
   route, injecting the result into <div id="root"> of the template. */
export function render(url: string): string {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  )
}
