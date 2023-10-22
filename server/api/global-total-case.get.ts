export default defineEventHandler(async (event) => {
    return await useStorage('myFileSystem').getItem('global-total-case.json') as CountriesTotalCase[];
})