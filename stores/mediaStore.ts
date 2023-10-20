import { defineStore } from "pinia";

export const useMediaStore = defineStore('media', {
    state: () => ({
        mediaCdcList: [] as CDCMedia[],
        aticlesHealth: []
    }),
    actions: {
        setMediaCdcList(list: CDCMedia[]) {
            this.mediaCdcList = list
        },
        setArticlesHealth(articles: any) {
            this.aticlesHealth = articles
        }
    }
}) 