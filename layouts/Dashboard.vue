<script setup lang="ts">
import { ref, nextTick } from 'vue'

const showSidebar = ref<boolean>(true)
const countrySearchField = ref<HTMLInputElement>()
const searchCountry = ref('')

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
        <section class="h-full w-full top-0 fixed bg-gray-900 transition-all transform duration-150 ease-in-out z-50"
            :class="showSidebar ? 'max-w-[300px]' : 'max-w-0 md:max-w-[60px]'">
            <div class="flex flex-col pt-2" :class="showSidebar ? 'items-end' : 'items-center'">
                <button class="py-2 pr-2 bg-gray-900 px-3 rounded-md"
                    :class="showSidebar ? 'translate-x-[0]' : 'translate-x-[30px] translate-y-[200px] md:translate-y-0 md:translate-x-0'"
                    @click="toggleSidebar">
                    <Icon color="white" :name="showSidebar ? 'mdi:arrow-expand-left' : 'mdi:arrow-expand-right'"
                        size="28px" />
                </button>

                <div class="flex border-t border-gray-700 pt-4 items-center px-2 gap-1 mt-2 w-full" @click="!showSidebar && toggleCountrySearch()">
                    <input ref="countrySearchField" v-model="searchCountry" placeholder="Search Country" type="text"
                        class="w-full pl-2 pr-8 h-10 rounded-md"
                        :class="showSidebar ? 'w-full' : 'fixed opacity-0 w-0'">
                    <Icon name="material-symbols:search" class="cursor-pointer" :size="showSidebar ? '32px' : '40px'"
                        :class="showSidebar ? 'fixed right-2 text-gray-600' : 'text-white pr-1'" />
                </div>
            </div>

            <SidebarCountriesList :filterCountry="searchCountry" :showList="showSidebar" class="mt-3" />
        </section>

        <article class="relative z-0 h-full min-h-screen flex flex-col w-full">
            <navbar-top class="relative z-50" :class="showSidebar ? 'md:pl-[310px]' : 'pl-3 sm:pl-[70px]'"></navbar-top>

            <div id="child" class="z-0 transition-all flex-1 flex flex-col"
                :class="showSidebar ? 'md:pl-[300px]' : 'md:pl-[55px]'">
                <slot></slot>
            </div>
        </article>
    </div>
</template>