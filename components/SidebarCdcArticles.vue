<script lang="ts" setup>
import { storeToRefs } from "pinia";

const props = defineProps<{ disableFetch?: boolean, limit?: number }>();
const router = useRouter();
const route = useRoute();
const mediaStore = useMediaStore();
const runtime = useRuntimeConfig();

const { mediaCdcList } = storeToRefs(mediaStore);

const paramId = computed(() => route?.params?.id || '');

function goToHealth(id?: string | number) {
    router.push('/media/' + id);
}

onMounted(() => {
    nextTick(async () => {
        if (!mediaCdcList.value.length && !props.disableFetch) {
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
    <section class="bg-slate-200 rounded-lg relative overflow-hidden">
        <h1 class="py-3 px-4 text-[16px] lg:text-[20px] border-b sticky top-0 bg-white">
            CDC Articles
        </h1>

        <div
            class="w-full flex flex-row md:flex-col relative overflow-x-auto md:max-h-full md:overflow-y-auto custom-scrollbar pb-4 md:pb-[100px]">
            <template v-for="item of mediaCdcList.slice(0, props.limit || 8)" :key="item.name">
                <article @click="paramId !== item.id && goToHealth(item?.id)"
                    class="font-light flex-grow md:h-auto text-[14px]  mt-2 mx-3 min-w-[320px] md:min-w-0"
                    :class="paramId.toString() === item?.id.toString() ? 'bg-slate-100 cursor-not-allowed' : 'bg-white hover:bg-slate-50'">
                    <div class="flex justify-between items-center text-[16px] lg:text-[18px] px-4 pt-3 pb-2">
                        <span class="">{{ item.name }}</span>
                    </div>
                    <div class="px-4 mt-0 pb-3 pt-2 border-t">
                        <p>{{ item.description }}</p>
                    </div>
                </article>
            </template>
        </div>

        <div class="bg-gradient-to-t from-slate-100 sticky bottom-0 h-[30px] w-full hidden md:block"></div>
    </section>
</template>
