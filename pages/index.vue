<template>
    <NuxtLayout name="dashboard">
       <div class="flex-1 flex flex-col">
        <div class="flex-1 grid grid-cols-1 lg:grid-cols-4">
            <section class="col-span-3">
               <WorldMap class="h-full" />
            </section>

            <section class="bg-gray-900">
                Top Case
            </section>
        </div>
       </div>
    </NuxtLayout>
</template>