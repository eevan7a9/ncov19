<script lang="ts" setup>
import { storeToRefs } from 'pinia';

const router = useRouter();
const mediaStore = useMediaStore();
const { articlesHealthList } = storeToRefs(mediaStore);
const runtime = useRuntimeConfig();
onMounted(() => {
    nextTick(async () => {
        if (!articlesHealthList.value.length) {
            const dataHealth = await $fetch<{ Result: ArticlesRes }>('/myhealthfinder/api/v3/itemlist.json?Type=topic', {
                baseURL: runtime.public.NUXT_API_HEALTH_GOV_URL,
                // key: 'health-gov',
                keepalive: true
            });
            if (dataHealth?.Result) {
                mediaStore.setArticlesHealth(dataHealth?.Result?.Items.Item?.slice(0,30));
            }
        }
    });
});

function goToHealth(id:string) {
    router.push('/media/health/'+id);
}
</script>

<template>
    <div class="bg-white rounded-lg">
        <div class="bg-gray-200 p-6 rounded-t-lg">
            <h4 class="text-[18px] lg:text-[20px] xltext-[24px]">Health and Wellness Topics</h4>
            <div class="text-lg mb-2 mt-3 text-gray-700">
                credit and link to 
                <a href="odphp.health.gov/myhealthfinder">odphp.health.gov/myhealthfinder</a>
            </div>
        </div>

        <div class="flex flex-col items-center justify-center py-3" v-if="!articlesHealthList.length">
            <h1 class="text-xl py-3">Fetching Data...</h1>
            <utils-spinner-circular />
        </div>

        <ul class="p-3">
            <li class="p-3 underline rounded-lg hover:bg-gray-100 cursor-pointer" v-for="(article, i) of articlesHealthList" :key="i" @click="goToHealth(article.Id)">
                {{ article.Title }}
            </li>
        </ul>
    </div>
</template>