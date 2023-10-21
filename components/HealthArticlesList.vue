<script lang="ts" setup>
import { storeToRefs } from 'pinia';

const mediaStore = useMediaStore()
const { articlesHealthList } = storeToRefs(mediaStore)
onMounted(() => {
    nextTick(async () => {
        if (!articlesHealthList.value.length) {
            const { data: dataHealth } = await useLazyFetch<{ Result: ArticlesRes }>('/myhealthfinder/api/v3/itemlist.json?Type=topic', {
                baseURL: 'https://health.gov',
                key: 'health-gov',
                keepalive: true
            })
            if (dataHealth.value?.Result) {
                mediaStore.setArticlesHealth(dataHealth.value?.Result?.Items.Item)
            }
        }
    })
})
</script>

<template>
    <div class="bg-white rounded-lg">
        <div class="bg-gray-200 p-6 rounded-t-lg">
            <h4 class="text-2xl">Health and Wellness Topics</h4>
            <div class="text-lg mb-2 mt-3 text-gray-700">
                Additional info from
                <a href="https://health.gov/">health.gov </a>
            </div>
        </div>

        <div class="flex flex-col items-center justify-center py-3" v-if="!articlesHealthList.length">
            <h1 class="text-xl py-3">Fetching Data...</h1>
            <utils-spinner-circular />
        </div>

        <ul class="p-3">
            <li class="p-3 underline rounded-lg hover:bg-gray-100" v-for="(article, i) of articlesHealthList" :key="i">
                {{ article.Title }}
            </li>
        </ul>
    </div>
</template>