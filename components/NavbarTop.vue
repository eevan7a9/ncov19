<script setup lang="tsx">
import IconClose from './icons/IconClose.vue';
import IconMenu from './icons/IconMenu.vue';

const runtime = useRuntimeConfig();
const showMobileNav = ref(false);

function toggleMobileNav() {
    showMobileNav.value = !showMobileNav.value;
}
</script>

<template>
    <nav class="z-50 flex items-center justify-between px-3 sm:px-6 py-2 lg:py-3 bg-red-900 text-white transition-all">
        <div class="inline-flex items-center gap-x-1">
            <NuxtImg src="/coronavirus.png" height="auto" />
            <a class="px-2 text-xl font-bold text-white contents">{{ runtime.public.APP_NAME }}</a>
        </div>

        <div class="hidden md:inline-block  pl-3 xl:pl-[100px] font-light text-[14px] lg:text-[16px] xl:text-[18px]">
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

        <div class="relative overflow-visible block md:hidden">
            <button @click="toggleMobileNav()">
                <IconMenu width="40px" height="40px" fill="white" />
            </button>
        </div>



        <div class="fixed w-[300px] top-0 right-0 h-screen bg-red-950 transition-all duration-300 ease-linear"
            :class="showMobileNav ? 'translate-x-0' : 'translate-x-[300px]'">
            <div class="flex justify-end">
                <button class="p-2" @click="toggleMobileNav()">
                    <IconClose width="30px" height="30px" fill="white" />
                </button>
            </div>
            <div class="flex flex-col gap-y-1 pl-4">
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
        </div>
    </nav>
</template>