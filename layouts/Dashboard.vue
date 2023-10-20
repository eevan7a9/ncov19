<script setup lang="ts">
import { ref, nextTick } from 'vue'

const showSidebar = ref<boolean>(true)
const countrySearchField = ref<HTMLInputElement>();

const toggleSidebar = function (): void {
    showSidebar.value = !showSidebar.value
}
const toggleCountrySearch = function (): void {
    toggleSidebar();
    nextTick(() => {
        countrySearchField.value?.focus()
    })
}
</script>

<template>
    <div>
        <section class="h-full top-0 fixed bg-gray-900 transition-all transform duration-150 ease-in-out side-bar"
            :class="showSidebar ? 'w-52' : 'w-12'">

            <div class="text-right">
                <button class="py-2 pr-2" @click="toggleSidebar">
                    <Icon color="white" name="mdi:arrow-expand-left" size="28px" v-if="showSidebar" />
                    <Icon color="white" name="mdi:arrow-expand-right" size="28px" v-else />
                </button>

                <div class="flex items-center px-2 gap-1 mt-2" v-if="showSidebar">
                    <input ref="countrySearchField" placeholder="Search Country" type="text"
                        class="w-full pl-2 pr-8 h-10 rounded-md">
                    <Icon name="material-symbols:search" size="32px" class="fixed right-2 text-gray-600" />
                </div>
                <button @click="toggleCountrySearch" v-else>
                    <Icon name="material-symbols:search" size="36px" class="mt-2 text-white pr-1" />
                </button>
            </div>

            <SidebarCountriesList :showList="showSidebar" class="mt-3" />
        </section>

        <article class="z-0 h-full min-h-screen flex flex-col">
            <navbar-top :class="showSidebar ? 'md:pl-52' : 'pl-12'"></navbar-top>

            <div id="child" class="transition-all flex-1 flex flex-col" :class="showSidebar ? 'md:pl-52' : 'pl-12'">
                <slot></slot>
            </div>
        </article>
    </div>
</template>

<style scoped lang="scss">
.side-bar {
z-index: 9999;
}
</style>