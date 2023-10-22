<script lang="ts" setup>
const article = ref<HealthGovRes>()
const currentSection = ref(0)
const title = ref('')
const description = ref('')
const content = ref('')
const disableNext = ref(false)
const disablePrev = ref(false)
const route = useRoute()
const { id } = route.params

const { data } = await useFetch<HealthGovRes>(`/myhealthfinder/api/v3/topicsearch.json?TopicId=${id}`, {
    baseURL: 'https://health.gov',
    keepalive: true
})

if (data.value) {
    article.value = data.value
}

onMounted(() => {
    setCurrentSection()
})

function setCurrentSection() {
    const sections = article.value?.Result?.Resources?.Resource[0].Sections?.section || []
    const section = sections[currentSection.value]
    if (section) {
        const { Title, Description, Content } = section
        title.value = Title
        description.value = Description
        content.value = Content

    }
    disableNext.value = currentSection.value + 1 >= sections.length
    disablePrev.value = currentSection.value == 0
}

function prevSection() {
    if (currentSection.value <= 0) {
        return;
    }
    currentSection.value--
    setCurrentSection()
}
function nextSection() {
    const sections = article.value?.Result?.Resources?.Resource[0].Sections?.section || []
    if (currentSection.value + 1 >= sections?.length) {
        return;
    }
    currentSection.value++
    setCurrentSection()
}
</script>

<template>
    <nuxt-layout>
        <div class="w-full lg:w-10/12 mx-auto flex items-center text-black mt-6">
            <nuxt-link class="text-2xl font-bold hover:bg-gray-100 p-3 rounded-lg cursor-pointer text-black"
                :to="'/media'">Media</nuxt-link>
            <Icon class=" text-red-900" name="mdi:chevron-right" size="44px" />
            <span class="text-2xl font-bold">{{ article?.Result?.Resources?.Resource[0]?.Title }}</span>
        </div>

        <div class="w-full lg:w-10/12 mx-auto pb-3 grid lg:grid-cols-12 gap-6">
            <article class="flex flex-col gap-4  pt-6 col-span-12 lg:col-span-9">
                <div class="bg-white pb-6">
                    <div class=" flex items-center justify-between border-b px-5 py-4">
                        <button class="bg-red-900 text-white py-3 px-5 rounded-lg font-bold" @click="prevSection()"
                            :disabled="disablePrev" :class="disablePrev ? 'bg-gray-300 cursor-not-allowed' : ''">
                            Prev
                        </button>

                        <div>
                            {{ currentSection + 1 }} / {{ article?.Result?.Resources?.Resource[0]?.Sections.section.length
                            }}
                        </div>

                        <button class="bg-red-900 text-white py-3 px-5 rounded-lg font-bold" @click="nextSection()"
                            :class="disableNext ? 'bg-gray-300 cursor-not-allowed' : ''" :disabled="disableNext">
                            Next
                        </button>
                    </div>

                    <h1 class="text-3xl mt-6 p-6 font-bold">
                        {{ title }}
                    </h1>
                    <h6 class="bg-red" v-if="description">
                        {{ description }}
                    </h6>
                    <div class="px-6 health-article-wrapper" :key="currentSection" v-if="title">
                        <article v-html="content"></article>
                    </div>
                </div>
            </article>

            <aside class="col-span-12 lg:col-span-3 pt-6">
                <health-articles-list />
            </aside>
        </div>
    </nuxt-layout>
</template>

<style lang="scss">
.health-article-wrapper {
    h4 {
        font-size: 2rem;
        padding: 16px 0;
    }

    p {
        font-size: 1.3rem;
        background-color: #f3f3f373;
        padding: 1rem;
        border-radius: 1rem;
        margin: 16px 0;
    }

    ul {
        padding-left: 1.1rem;

        li {
            font-weight: 500;
            padding: 8px 0;
        }
    }
}
</style>