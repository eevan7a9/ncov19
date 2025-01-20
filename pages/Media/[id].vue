<script lang="ts" setup>

const syndicate = ref<CDCMediaSyndicate>();
const runtime = useRuntimeConfig();
const route = useRoute()
const { id } = route.params
const { data } = await useFetch<CDCMediaSyndicate>(`/api/v5/resources/media/${id}/syndicate.json`, {
    baseURL: runtime.public.NUXT_API_CDC_URL,
    keepalive: true
})

// console.log(data.value);
if (data.value) {
    syndicate.value = data.value
}
</script>


<template>
    <nuxt-layout>
        <div class="w-full max-w-screen-lg mx-auto pb-3 grid md:grid-cols-12 gap-6 px-3">
            <article class="flex flex-col gap-4  pt-6 col-span-12 md:col-span-9">
                <div class="flex items-center text-black">
                    <nuxt-link
                        class="text-[18px] lg:text-2xl font-bold hover:bg-gray-100 p-3 rounded-lg cursor-pointer text-black"
                        :to="'/media'">Media</nuxt-link>
                    <Icon class="text-red-900" name="mdi:chevron-right" size="44px" />
                    <span class="text-[18px] lg:text-2xl font-bold text-ellipsis line-clamp-1">{{
                        syndicate?.results.name }}</span>
                </div>

                <div class="cdc-container bg-white px-3 md:px-8 py-4 md:py-6" v-html="syndicate?.results.content"></div>
            </article>

            <aside class="col-span-12 md:col-span-3 pt-6 mt-[70px] overflow-hidden">
                <SidebarCdcArticles :limit="12" />
            </aside>
        </div>
        <FooterBar class="mt-4" />
    </nuxt-layout>
</template>

<style lang="scss">
/* Syndicate content Iframe */
$primary: #00575e;
$primary-bg: rgba(0, 225, 255, 0.13);
$primary-border: rgba(0, 89, 95, 0.849);

iframe {
    height: 100%;
    min-height: 100vh;
}

.cdc-container {

    .cdc-page-title h1,
    .page-title h1 {
        font-size: 1.9444rem;
        margin-top: 0;

        color: $primary;
        font-weight: 300;
        margin-bottom: 18px;
    }

    h2 {
        margin-top: 2.5rem;
        font-size: 1.75rem;
        line-height: 1.3;
        font-weight: 300;
        margin-bottom: .75rem;
        color: $primary;
        letter-spacing: -.03px;

        &.editor-block--title {
            font-size: 20px;
            margin-top: 12px;
        }
    }

    .dfe-section--page-summary {
        margin: 16px 0;
        background-color: $primary-bg;
        border: 1px solid $primary-border;
        border-radius: 6px;
        flex-direction: row;
        padding: 8px;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        // flex-direction: column;

        .dfe-section__header {
            min-width: 100%;
            background-color: transparent;
            order: 0;
        }

        .dfe-section__content {
            order: 0;
            width: 66%;
            padding-bottom: 0;
        }

        .dfe-section__image {
            flex: none;
            margin-bottom: 0;
            order: 0;
            padding: 0 1rem 0 .2rem;
            width: 34%;
        }
    }

    .nested-list {
        list-style: disc;
        padding-left: 24px;
        text-decoration: none;
        color: $primary;

        a {
            text-decoration: underline;
            color: $primary;
        }
    }

    .dfe-block--keep_reading {
        padding: .75rem 1rem;
        border: 1px solid;
        background-color: $primary-bg;
        border: 1px solid $primary-border;
        border-radius: 4px;
        font-family: var(--fonts-nunito);
        font-weight: 600;
        margin: 1.75rem 0 2.5rem;

        a {
            font-weight: 400;
            font-size: 17px;
            text-decoration: none;
            width: 100%;
            display: inline;
            margin-left: 8px;
            color: $primary;
        }
    }

    .cdc-callout {
        z-index: 0;
        background-color: $primary-bg;
        border: 1px solid $primary-border;
        padding: 1.25rem;
        position: relative;
        border-radius: .25rem;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: .5rem;
        margin: 12px auto;
    }

    // Youtube Style
    .dfe-block--cdcmodule {
        clear: both;
        padding-top: 1rem;

        .cdc-youtube-embed iframe {
            width: 100%;
            aspect-ratio: 16/9;
            background-size: cover;
            height: 400px;
        }

        .small.file_links_container {
            display: none;
        }
    }

}

@media (max-width: 1280px) {
    .cdc-container {

        .cdc-page-title h1,
        .page-title h1 {
            font-size: 18px;
        }

        .dfe-section--page-summary {
            flex-direction: column;
            align-items: start;

            .dfe-section__content {
                width: 100%;
            }

            .dfe-section__image {
                width: 100%;
            }
        }
    }
}
</style>