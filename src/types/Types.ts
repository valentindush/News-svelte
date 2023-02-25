
interface Source{
    id: string
    name: string
}
export interface Article{
    author: string| null
    content: string|null
    description: string|null
    publishedAt: Date | null
    source: Source
    title: string
    url: string
    urlToImage: string
}