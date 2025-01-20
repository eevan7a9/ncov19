import { defineStore } from "pinia";

export const useMediaStore = defineStore('media', {
    state: (): {
        mediaCdcList: CDCMedia[];
        articlesHealthList:  HealthArticle[];
    } => ({
        mediaCdcList: [],
        articlesHealthList: []
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