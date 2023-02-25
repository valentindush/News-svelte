<script lang="ts">
import Header from "./lib/Header.svelte";
import {onMount} from "svelte";
import type {Article} from "./types/Types";
import NewsItem from "./lib/NewsItem.svelte";
import PopUp from "./lib/PopUp.svelte";
import * as stream from "stream";
import Footer from "./lib/Footer.svelte";

let topHeadlines: Article[] = []
let categoryArticles: Article[] = []
let countryArticles: Article[] = []
const categories: string[] = [
        "All",
        "Rap",
        "Technology",
        "Entertainment",
        "Music",
        "Movies",
        "Sports",
        "Health",
        "Politics",
]
const countries: string[] = [
    "Rwanda",
    "US",
    "Nigeria",
    "South Africa",
    "Canada",
    "Ghana",
    "China"
]
let activeCountry = countries[0]
let activeCategory = categories[0]
let loading = false
let loading1 = false
let loading2 = false
let popUpContent: Article
let isPopUpActive = false
const getTopHeadLines = ()=>{
  const baseUrl = import.meta.env.VITE_NEWS_BASE_URL
  const apiKey = import.meta.env.VITE_NEWS_API_KEY
  loading = true;
  fetch(`${baseUrl}/top-headlines?q=tech&apiKey=${apiKey}`)
          .then(res => res.json())
          .then((result)=>{
            let data:Article[] = []
            result.articles?.forEach((item)=>{
              data.push(<Article>{
                author: item.author,
                content: item.content,
                description: item.description,
                publishedAt: new Date(item.publishedAt),
                source: {
                  id: item.source.id,
                  name: item.source.name
                },
                title: item.title,
                url: item.url,
                urlToImage: item.urlToImage
              })
            })

            topHeadlines = data
            loading = false;
          }).catch((err)=>{
            loading = false
  })
}

const getNewsByCategory = (category: string)=>{
  const baseUrl = import.meta.env.VITE_NEWS_BASE_URL
  const apiKey = import.meta.env.VITE_NEWS_API_KEY
  loading1 = true;
  fetch(`${baseUrl}/everything?q=${category}&apiKey=${apiKey}`)
          .then(res => res.json())
          .then((result)=>{
            let data:Article[] = []
            result.articles?.forEach((item)=>{
              data.push(<Article>{
                author: item.author,
                content: item.content,
                description: item.description,
                publishedAt: new Date(item.publishedAt),
                source: {
                  id: item.source.id,
                  name: item.source.name
                },
                title: item.title,
                url: item.url,
                urlToImage: item.urlToImage
              })
            })

            categoryArticles = data
            loading1 = false;
          }).catch((err)=>{
          loading1 = false
  })
}

const getNewsByCountry = (country: string)=>{
    const baseUrl = import.meta.env.VITE_NEWS_BASE_URL
    const apiKey = import.meta.env.VITE_NEWS_API_KEY
    loading2 = true;
    fetch(`${baseUrl}/everything?q=${country.toLowerCase()}&apiKey=${apiKey}`)
        .then(res => res.json())
        .then((result)=>{
            let data:Article[] = []
            result.articles?.forEach((item)=>{
                data.push(<Article>{
                    author: item.author,
                    content: item.content,
                    description: item.description,
                    publishedAt: new Date(item.publishedAt),
                    source: {
                        id: item.source.id,
                        name: item.source.name
                    },
                    title: item.title,
                    url: item.url,
                    urlToImage: item.urlToImage
                })
            })

            countryArticles = data
            loading2 = false;
        }).catch((err)=>{
        loading2 = false
        console.log(err)
    })
}
onMount(()=>{
  getTopHeadLines()
  getNewsByCategory(categories[0]);
    getNewsByCountry(countries[0])
})

const togglePopUp = (item: Article)=>{
    isPopUpActive = true;
    popUpContent = item
}




</script>

<main class="bg-white w-screen h-screen overflow-x-hidden relative z-0">
  <Header/>

  <div class="px-12 md:px-4">
    <!--Top Headlines-->
    <h2 class="text-gray-800 text-xl font-semibold mt-6">Top HeadLines</h2>
    {#if !loading}
      <div class="flex items-center gap-5 flex-wrap pt-6 md:gap-3 ">
        {#each topHeadlines.slice(0,8) as item}
          <NewsItem onClick={togglePopUp} article={item} />
        {/each}
      </div>
      {:else }
      <div class="animate-pulse h-24 mt-2 bg-slate-200 rounded-lg"></div>
      <div class="animate-pulse h-24 mt-2 bg-slate-200 rounded-lg"></div>
      <div class="animate-pulse h-24 mt-2 bg-slate-200 rounded-lg"></div>

    {/if}

  <!--Categories-->
    <h2 class="text-gray-800 text-xl font-semibold mt-6">Search By Categories</h2>
    <div class="flex items-center gap-2 mt-4">
      {#each categories as cat}
        <button on:click={()=>{activeCategory = cat; getNewsByCategory(cat)}} class={`border rounded-full p-2 px-4 ${activeCategory === cat? "bg-blue-500 text-white":"text-gray-800 bg-white"}`}>{cat}</button>
      {/each}
    </div>
    {#if !loading1}
      <div class="flex items-center gap-5 flex-wrap pt-6">
        {#each categoryArticles.slice(0,10) as item}
          <NewsItem onClick={togglePopUp} article={item} />
        {/each}
      </div>
      {:else }
        <div class="animate-pulse h-24 mt-2 bg-slate-200 rounded-lg z-0"></div>
        <div class="animate-pulse h-24 mt-2 bg-slate-200 rounded-lg z-0"></div>
        <div class="animate-pulse h-24 mt-2 bg-slate-200 rounded-lg z-0"></div>
        <div class="animate-pulse h-24 mt-2 bg-slate-200 rounded-lg z-0"></div>
    {/if}


      <!--Countries-->

      <h2 class="text-gray-800 text-xl font-semibold mt-6">Search By Countries</h2>
      <div class="flex items-center gap-2 mt-4 overflow-x-auto">
          {#each countries as cnt}
              <button on:click={()=>{activeCountry = cnt; getNewsByCountry(cnt)}} class={`border rounded-full p-2 px-4 block w-fit ${activeCountry === cnt? "bg-blue-500 text-white":"text-gray-800 bg-white"}`}>{cnt}</button>
          {/each}
      </div>
      {#if !loading2}
          <div class="flex items-center gap-5 flex-wrap pt-6">
              {#each countryArticles.slice(0,10) as item}
                  <NewsItem onClick={togglePopUp} article={item} />
              {/each}
          </div>
      {:else }
          <div class="animate-pulse h-24 mt-2 bg-slate-200 rounded-lg z-0"></div>
          <div class="animate-pulse h-24 mt-2 bg-slate-200 rounded-lg z-0"></div>
          <div class="animate-pulse h-24 mt-2 bg-slate-200 rounded-lg z-0"></div>
          <div class="animate-pulse h-24 mt-2 bg-slate-200 rounded-lg z-0"></div>
      {/if}
  </div>
    <hr class="mt-12" />
    <Footer />
</main>
{#if isPopUpActive}
    <div class="absolute top-0 left-0 z-10 w-screen h-screen bg-black bg-opacity-70 backdrop-blur-md p-24 md:w-full overflow-y-auto">
        <button on:click={()=>isPopUpActive = false} class="text-red-500 font-medium float-right">Close</button>

        <div class="text-white font-medium">

            <img src={popUpContent.urlToImage} class="w-full h-[50vh] object-fit mt-2" alt="img">

            <h2 class="text-xl my-4">{popUpContent.title}</h2>

            <div class="text-md text-gray-300">
                {@html popUpContent.content}
            </div>
            <div class="text-md text-gray-300 mt-4">
                {@html popUpContent.description}
            </div>
            <div class="text-md font-regular text-gray-300 mt-3">
                <p>Author : {popUpContent.author}</p>
                <p>Source : {popUpContent.source.name}</p>
                <p>Url : <a href={popUpContent.url} class="underline text-blue-400">{popUpContent.url}</a></p>
            </div>
        </div>
    </div>
{/if}