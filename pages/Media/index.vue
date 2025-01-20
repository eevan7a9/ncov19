<script lang="ts" setup>
import { storeToRefs } from "pinia";

const mediaStore = useMediaStore();
const runtime = useRuntimeConfig();
const { mediaCdcList } = storeToRefs(mediaStore);

onMounted(() => {
    nextTick(async () => {
        if (!mediaCdcList.value.length) {
            const dataCdc = await $fetch<{
                results: CDCMedia[];
                meta: CDCMeta;
            }>("/api/v2/resources/media?languageisocode=eng", {
                baseURL: runtime.public.NUXT_API_CDC_URL,
                // key: "cdc-media",
                keepalive: true,
            });
            if (dataCdc?.results) {
                mediaStore.setMediaCdcList(dataCdc.results);
            }
        }
    });
});
</script>

<template>
    <NuxtLayout name="default">
        <div class="bg-slate-100 min-h-screen w-full max-w-screen-lg mx-auto pb-3 grid md:grid-cols-12 gap-6">
            <article class="flex flex-col px-3 gap-4 pt-6 col-span-12 md:col-span-9">
                <div class="bg-white py-8 flex flex-col items-center justify-center" v-if="!mediaCdcList.length">
                    <h1 class="text-2xl font-bold py-6">Fetching Data...</h1>
                    <utils-spinner-circular />
                </div>
                <div class="bg-red-200 p-6 rounded-lg border border-red-700" v-else>
                    <div id="cdcAttribution" class="cdcAttribution">
                        Content provided and maintained by the
                        <a href="http://www.cdc.gov/" target="_blank">
                            US Centers for Disease Control and Prevention
                        </a>
                        (CDC). Please see our system
                        <a href="https://tools.cdc.gov/medialibrary/index.aspx#/usageguidelines/info"
                            class="usageGuidelines" target="_blank">usage guidelines and disclaimer</a>.
                    </div>
                </div>

                <nuxt-link v-for="(media, i) of mediaCdcList" :key="i" :to="'/media/' + media.id">
                    <media-card :media="media" />
                </nuxt-link>
            </article>

            <aside class="col-span-12 md:col-span-3 pt-6">
                <health-articles-list />
            </aside>
        </div>

        <FooterBar class="mt-4" />
    </NuxtLayout>
</template>

<style lang="scss" scoped></style>
