import { defineStore } from "pinia";

export const useMediaStore = defineStore('media', {
    state: () => ({
        mediaCdcList: [] as CDCMedia[],
        articlesHealthList: [] as HealthArticle[]
    }),
    actions: {
        setMediaCdcList(list: CDCMedia[]) {
            this.mediaCdcList = list
        },
        setArticlesHealth(articles: HealthArticle[]) {
            this.articlesHealthList = articles
        }
    }
}) 