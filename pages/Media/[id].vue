<script lang="ts" setup>

const syndicate = ref<CDCMediaSyndicate>();

const route = useRoute()
const { id } = route.params
const { data } = await useFetch<CDCMediaSyndicate>(`/api/v3/resources/media/${id}/syndicate.json`, {
    baseURL: 'https://tools.cdc.gov',
    keepalive: true
})

if (data.value) {
    syndicate.value = data.value
}
</script>


<template>
    <div>
        <navbar-top></navbar-top>
        <div class="w-full lg:w-10/12 mx-auto pb-3 grid lg:grid-cols-12 gap-6">
            <article class="flex flex-col gap-4  pt-6 col-span-12 lg:col-span-9">
                <div class="flex items-center text-black">
                    <nuxt-link
                        class="text-2xl font-bold hover:bg-gray-100 p-3 rounded-lg cursor-pointer text-black" :to="'/media'">Media</nuxt-link>
                    <Icon class=" text-red-900" name="mdi:chevron-right" size="44px" />
                    <span class="text-2xl font-bold">{{ syndicate?.results.name }}</span>
                </div>

                <div v-html="syndicate?.results.content"></div>
            </article>

            <aside class="col-span-12 lg:col-span-3 pt-6">
                <health-articles-list />
            </aside>
        </div>
    </div>
</template>

<style lang="scss">
/* Syndicate content Iframe */
iframe {
    height: 100%;
    min-height: 100vh;
}
</style>