import { useQuery, UseQueryOptions } from 'react-query'
export type Maybe<T> = T
export type InputMaybe<T> = T
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> }

function fetcher<TData, TVariables>(query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch(
      `${
        process.env.NODE_ENV === 'development' && typeof window !== 'undefined'
          ? ''
          : (typeof window === 'undefined' && process.env.CMS_ORIGIN_SSR) ||
          process.env.CMS_ORIGIN ||
          ''
      }/graphql` as string,
      {
        method: 'POST',
        ...{headers: {'Content-Type': 'application/json'}},
        body: JSON.stringify({query, variables}),
      },
    )

    const json = await res.json()

    if (json.errors) {
      const {message} = json.errors[0]

      throw new Error(message)
    }

    return json.data
  }
}

export type ArticlesQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>
  limit?: InputMaybe<Scalars['Int']>
  lang?: InputMaybe<Scalars['String']>
}>

export type ArticlesQuery = {
  article: Array<{
    id: string
    create_date: any
    update_date: any
    image: { id: string }
    translations: Array<{
      title: string
      slug: string
      summary: string
      languages_id: { code: string }
    }>
  }>
}

export type ArticleQueryVariables = Exact<{
  slug?: InputMaybe<Scalars['String']>
  lang?: InputMaybe<Scalars['String']>
}>

export type ArticleQuery = {
  article: Array<{
    id: string
    create_date: any
    update_date: any
    image: { id: string }
    translations: Array<{
      title: string
      slug: string
      summary: string
      content: string
      languages_id: { code: string }
    }>
  }>
}

export type PrevNextArticlesQueryVariables = Exact<{
  prevFilter?: InputMaybe<Article_Filter>
  nextFilter?: InputMaybe<Article_Filter>
  lang?: InputMaybe<Scalars['String']>
}>

export type PrevNextArticlesQuery = {
  prev: Array<{
    id: string
    create_date: any
    update_date: any
    image: { id: string }
    translations: Array<{
      title: string
      slug: string
      summary: string
      languages_id: { code: string }
    }>
  }>
  next: Array<{
    id: string
    create_date: any
    update_date: any
    image: { id: string }
    translations: Array<{
      title: string
      slug: string
      summary: string
      languages_id: { code: string }
    }>
  }>
}

export type ArticlesSitemapQueryVariables = Exact<{ [key: string]: never }>

export type ArticlesSitemapQuery = {
  article: Array<{
    create_date: any
    update_date: any
    translations: Array<{ slug: string; languages_id: { code: string } }>
  }>
}

export const ArticleBaseFragmentDoc = `
    fragment ArticleBase on article {
  id
  create_date
  update_date
  image {
    id
  }
  translations(filter: {languages_id: {code: {_eq: $lang}}}) {
    title
    slug
    summary
    languages_id {
      code
    }
  }
}
    `
export const ArticleFragmentDoc = `
    fragment Article on article {
  id
  create_date
  update_date
  image {
    id
  }
  translations(filter: {languages_id: {code: {_eq: $lang}}}) {
    title
    slug
    summary
    content
    languages_id {
      code
    }
  }
}
    `
export const ArticlesDocument = `
    query articles($page: Int = 0, $limit: Int = 10, $lang: String = "ru") {
  article(sort: ["-create_date"], page: $page, limit: $limit) {
    ...ArticleBase
  }
}
    ${ArticleBaseFragmentDoc}`
export const useArticlesQuery = <TData = ArticlesQuery, TError = unknown>(
  variables?: ArticlesQueryVariables,
  options?: UseQueryOptions<ArticlesQuery, TError, TData>,
) =>
  useQuery<ArticlesQuery, TError, TData>(
    variables === undefined ? ['articles'] : ['articles', variables],
    fetcher<ArticlesQuery, ArticlesQueryVariables>(ArticlesDocument, variables),
    options,
  )
useArticlesQuery.document = ArticlesDocument

useArticlesQuery.getKey = (variables?: ArticlesQueryVariables) =>
  variables === undefined ? ['articles'] : ['articles', variables]
useArticlesQuery.fetcher = (variables?: ArticlesQueryVariables) =>
  fetcher<ArticlesQuery, ArticlesQueryVariables>(ArticlesDocument, variables)
export const ArticleDocument = `
    query article($slug: String, $lang: String = "ru") {
  article(filter: {translations: {slug: {_eq: $slug}}}) {
    ...Article
  }
}
    ${ArticleFragmentDoc}`
export const useArticleQuery = <TData = ArticleQuery, TError = unknown>(
  variables?: ArticleQueryVariables,
  options?: UseQueryOptions<ArticleQuery, TError, TData>,
) =>
  useQuery<ArticleQuery, TError, TData>(
    variables === undefined ? ['article'] : ['article', variables],
    fetcher<ArticleQuery, ArticleQueryVariables>(ArticleDocument, variables),
    options,
  )
useArticleQuery.document = ArticleDocument

useArticleQuery.getKey = (variables?: ArticleQueryVariables) =>
  variables === undefined ? ['article'] : ['article', variables]
useArticleQuery.fetcher = (variables?: ArticleQueryVariables) =>
  fetcher<ArticleQuery, ArticleQueryVariables>(ArticleDocument, variables)
export const PrevNextArticlesDocument = `
    query prevNextArticles($prevFilter: article_filter, $nextFilter: article_filter, $lang: String = "ru") {
  prev: article(page: 0, sort: ["-create_date"], limit: 1, filter: $prevFilter) {
    ...ArticleBase
  }
  next: article(page: 0, sort: ["create_date"], limit: 1, filter: $nextFilter) {
    ...ArticleBase
  }
}
    ${ArticleBaseFragmentDoc}`
export const usePrevNextArticlesQuery = <TData = PrevNextArticlesQuery, TError = unknown>(
  variables?: PrevNextArticlesQueryVariables,
  options?: UseQueryOptions<PrevNextArticlesQuery, TError, TData>,
) =>
  useQuery<PrevNextArticlesQuery, TError, TData>(
    variables === undefined ? ['prevNextArticles'] : ['prevNextArticles', variables],
    fetcher<PrevNextArticlesQuery, PrevNextArticlesQueryVariables>(
      PrevNextArticlesDocument,
      variables,
    ),
    options,
  )
usePrevNextArticlesQuery.document = PrevNextArticlesDocument

usePrevNextArticlesQuery.getKey = (variables?: PrevNextArticlesQueryVariables) =>
  variables === undefined ? ['prevNextArticles'] : ['prevNextArticles', variables]
usePrevNextArticlesQuery.fetcher = (variables?: PrevNextArticlesQueryVariables) =>
  fetcher<PrevNextArticlesQuery, PrevNextArticlesQueryVariables>(
    PrevNextArticlesDocument,
    variables,
  )
export const ArticlesSitemapDocument = `
    query articlesSitemap {
  article(sort: ["-create_date"], limit: -1, filter: {status: {_eq: "published"}}) {
    create_date
    update_date
    translations(filter: {title: {_nempty: true}}) {
      slug
      languages_id {
        code
      }
    }
  }
}
    `
export const useArticlesSitemapQuery = <TData = ArticlesSitemapQuery, TError = unknown>(
  variables?: ArticlesSitemapQueryVariables,
  options?: UseQueryOptions<ArticlesSitemapQuery, TError, TData>,
) =>
  useQuery<ArticlesSitemapQuery, TError, TData>(
    variables === undefined ? ['articlesSitemap'] : ['articlesSitemap', variables],
    fetcher<ArticlesSitemapQuery, ArticlesSitemapQueryVariables>(
      ArticlesSitemapDocument,
      variables,
    ),
    options,
  )
useArticlesSitemapQuery.document = ArticlesSitemapDocument

useArticlesSitemapQuery.getKey = (variables?: ArticlesSitemapQueryVariables) =>
  variables === undefined ? ['articlesSitemap'] : ['articlesSitemap', variables]
useArticlesSitemapQuery.fetcher = (variables?: ArticlesSitemapQueryVariables) =>
  fetcher<ArticlesSitemapQuery, ArticlesSitemapQueryVariables>(
    ArticlesSitemapDocument,
    variables,
  )
export const GlobalDataDocument = `
    query globalData {
  global {
    notice
  }
}
    `
