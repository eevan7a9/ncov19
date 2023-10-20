<script lang="ts" setup>
const props = defineProps<{ media: CDCMedia }>()

function getImageUrl(media: CDCMedia) {
    if (!media.alternateImages?.length) {
        return
    }
    return media.alternateImages[2]?.url || media.alternateImages[1]?.url
}
</script>


<template>
    <div class="bg-white border py-6 px-6 rounded-lg">
        <div class="flex lg:flex-row" :class="getImageUrl(props.media) ? 'justify-between' : ''">
            <div class="h-100 flex flex-col pr-3">
                <h1 class="text-2xl font-bold pb-3" v-html="props.media.name"></h1>
                <p class="text-xl py-3" v-if="props.media.description">
                    {{ props.media.description }}
                </p>
                <div class="border-t py-4 mt-auto" v-html="props.media.attribution"></div>
            </div>

            <div class="mt-6 lg:mt-0 flex justify-end" v-if="getImageUrl(props.media)">
                <div class=" w-full" style="max-width: 200px;">
                    <img :src="getImageUrl(props.media)" width="auto" :alt="props.media.name" srcset="">
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
a {
    color: #007bff;
}
</style>