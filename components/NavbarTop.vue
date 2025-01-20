<script setup lang="tsx">
const runtime = useRuntimeConfig();
</script>

<template>
    <nav class="flex items-center justify-between px-6 py-2 lg:py-3 bg-red-900 text-white transition-all">
        <div class="inline-flex items-center gap-x-1">
            <NuxtImg src="/coronavirus.png" height="auto" />
            <a class="px-2 text-xl font-bold text-white contents">{{ runtime.public.APP_NAME }}</a>
        </div>

        <div class="inline-block pl-3 xl:pl-[100px] font-light text-[14px] lg:text-[16px] xl:text-[18px]">
            <NuxtLink to="/" class="px-3 py-3 hover:bg-red-800 text-white" active-class="font-bold">
                Dashboard
            </NuxtLink>
            <NuxtLink to="/media" class="px-3 py-3 hover:bg-red-800 text-white" active-class="font-bold">
                Health Media
            </NuxtLink>
            <NuxtLink to="/about" class="px-3 py-3 hover:bg-red-800 text-white" active-class="font-bold">
                About
            </NuxtLink>
        </div>
    </nav>
</template>