<script lang="ts">
    export let isActive = true;
    export let content: string
</script>

{#if isActive}
    <div class="absolute top-0 left-0 z-10 w-screen h-screen bg-black bg-opacity-70 backdrop-blur-md p-4 md:w-full">
        <button on:click={()=>isActive = false} class="text-red-500 font-medium">Close</button>

        <div class="mt-4 text-gray-800 font-medium">
            {@html content}
        </div>
    </div>
{/if}