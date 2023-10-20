<script lang="ts" setup>
const mediaList = ref<CDCMedia[]>([])

const res = await useLazyFetch<{ results: CDCMedia[], meta: CDCMeta }>('https://tools.cdc.gov/api/v2/resources/media?languageisocode=eng');
mediaList.value = res.data.value?.results || []

function getImageUrl(media: CDCMedia) {
    if (!media.alternateImages?.length) {
        return
    }
    return media.alternateImages[2]?.url || media.alternateImages[1]?.url
}
</script>

<template>
    <nuxt-layout>
        <div class="first-letter:w-full lg:w-10/12 mx-auto pb-3 grid lg:grid-cols-12 gap-6">
            <article class="flex flex-col gap-4  pt-6 col-span-9">
                <div class="bg-white border py-6 px-6 rounded-lg" v-for="media, i of mediaList" :key="i">
                    <div class="flex flex-col lg:flex-row" :class="getImageUrl(media) ? 'justify-between' : ''">
                        <div class="h-100 flex flex-col">
                            <h1 class="text-2xl font-bold pb-3" v-html="media.name"></h1>
                            <p class="text-xl py-3" v-if="media.description">
                                {{ media.description }}
                            </p>
                            <div class="border-t py-4 mt-auto" v-html="media.attribution"></div>
                        </div>

                        <div class="mt-6 lg:mt-0" v-if="getImageUrl(media)">
                            <img :src="getImageUrl(media)" width="auto" height="200px" :alt="media.name" srcset="">
                        </div>
                    </div>
                </div>
            </article>

            <aside class="col-span-3 h-full">
                Side Content
            </aside>
        </div>
    </nuxt-layout>
</template>

<style lang="scss"></style>