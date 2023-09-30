<script setup lang="ts">
const showSidebar = ref(true)

const toggleSidebar = function (): void {
    showSidebar.value = !showSidebar.value
}
</script>

<template>
    <div>
        <section class="h-full top-0 fixed bg-gray-900 transition-all transform duration-150 ease-in-out"
            :class="showSidebar ? 'w-48' : 'w-12'">

            <div class="text-right">
                <button class="py-2 pr-2" @click="toggleSidebar">
                    <Icon color="white" name="mdi:arrow-expand-left" size="28px" v-if="showSidebar" />
                    <Icon color="white" name="mdi:arrow-expand-right" size="28px" v-else />
                </button>

                <div class="flex items-center px-2 gap-1 mt-2" v-if="showSidebar">
                    <input placeholder="Search Country" type="text" class="w-full pl-2 pr-8 h-10 rounded-md">
                    <Icon name="material-symbols:search" size="32px" class="fixed right-2" />
                </div>
                <button @click="toggleSidebar" v-else>
                    <Icon name="material-symbols:search" size="36px" class="mt-2 text-white pr-1"  />
                </button>
            </div>


        </section>

        <article class="bg-blue-300 h-full">
            <nav class="px-6 py-3 bg-red-900 text-white transition-all" :class="showSidebar ? 'pl-52' : 'pl-20'">
                Ncov19
            </nav>

            <div class=" transition-all" :class="showSidebar ? 'pl-52' : 'pl-20'">
              
            </div>
        </article>
    </div>
</template>