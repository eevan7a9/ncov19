<script lang="ts" setup>
const runtime = useRuntimeConfig();
</script>

<template>
    <footer class="text-center border-t py-4">
        <div class="pb-1 text-black text-[18px] font-bold">
            <NuxtImg src="/coronavirus.png" height="30px" class="inline-block" />
            <span class="ml-2">{{ runtime.public.APP_NAME }}</span>
        </div>
        <div>
            <NuxtLink class="cursor-pointer" href="https://github.com/eevan7a9/ncov19" target="_blank">
                github.com/eevan7a9/ncov19
            </NuxtLink>
        </div>
    </footer>
</template>