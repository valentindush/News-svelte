<script lang="ts">
import type {Article} from "../types/Types";
import {onMount} from "svelte";

export let article: Article
export let onClick: Function
</script>
<div on:click={()=>onClick(article)} class="w-[300px] h-[400px] shadow-lg bg-slate-100 p-2 rounded-lg cursor-pointer md:w-full">
    <img src={article.urlToImage} alt="coverImg" class="w-full h-[60%] rounded-lg object-cover">
    <a about="_blank" href={article.url} class="font-medium text-gray-700 mt-3 block hover:text-blue-400 transition">{@html article.title}</a>

    <p class="text-sm mt-2 text-gray-800 font-light">
        {@html article.content.slice(0,90)}...
    </p>
</div>