// import { detectLocale } from '$i18n/i18n-util'
// import type { GetSession, RequestEvent } from '@sveltejs/kit'
// import { initAcceptLanguageHeaderDetector } from 'typesafe-i18n/detectors'

// const getHeaders = (event: RequestEvent) => {
//   const headers: Record<string, string> = {}
//   event.request.headers.forEach((value, key) => { headers[key] = value })

//   return headers
// }

// export const getSession: GetSession = (event) => {
//   // detect the preferred language the user has configured in his browser
//   // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language
//   const headers = getHeaders(event)
//   const acceptLanguageDetector = initAcceptLanguageHeaderDetector({ headers })
//   const locale = detectLocale(acceptLanguageDetector)

//   return {
//     locale,
//   }
// }

import { base } from '$app/paths'
import type { Locales } from '$i18n/i18n-types.js'
import { detectLocale, i18n } from '$i18n/i18n-util'
import { loadAllLocales } from '$i18n/i18n-util.sync'
import { redirect, type Handle, type RequestEvent } from '@sveltejs/kit'
import { initAcceptLanguageHeaderDetector } from 'typesafe-i18n/detectors'

loadAllLocales()
const L = i18n()

export const handle: Handle = async ({ event, resolve }) => {
  // read language slug
  const [, lang] = getPathnameWithoutBase(event.url).split('/')

  // redirect to base locale if no locale slug was found
  if (!lang) {
    const locale = getPreferredLocale(event)

    throw redirect(307, `${base}/${locale}`)
  }

  // if slug is not a locale, use base locale (e.g. api endpoints)
  const locale = getPreferredLocale(event)
  const LL = L[locale]

  // bind locale and translation functions to current request
  // @ts-expect-error テスト用
  event.locals.locale = locale
  // @ts-expect-error テスト用
  event.locals.LL = LL

  // @ts-expect-error テスト用
  console.info(LL.log({ fileName: 'hooks.server.ts' }))

  // replace html lang attribute with correct language
  return resolve(event, {
    transformPageChunk: ({ html }) => html.replace('%lang%', locale),
  })
}

const REGEX_START_WITH_BASE = new RegExp(`^${base}`)
const getPathnameWithoutBase = (url: URL) =>
  url.pathname.replace(REGEX_START_WITH_BASE, '')

const getPreferredLocale = ({ request }: RequestEvent) => {
  // detect the preferred language the user has configured in his browser
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language
  const acceptLanguageDetector = initAcceptLanguageHeaderDetector(request)

  return detectLocale(acceptLanguageDetector)
}
