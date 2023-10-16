<script lang="ts" setup>
const emits = defineEmits<{ close: [id: boolean] }>()

function closeModal(e: MouseEvent) {
    e.stopPropagation()
    emits('close', true)
}
</script>

<template>
    <div class="z-9999 dark-transparent absolute bottom-0 right-0 left-0 top-0 flex justify-center overflow-hidden py-6 lg:py-20"
        @click="closeModal">
        <div class="bg-white text-black rounded-md overflow-hidden w-full lg:w-10/12 flex flex-col" @click.stop>
            <slot name="header"></slot>


            <section class="py-3 px-4 overflow-auto h-full  custom-scrollbar">
                <slot></slot>
            </section>

            <slot name="footer"></slot>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.dark-transparent {
    background-color: rgba(0, 0, 0, 0.678);
}
</style>