<script setup lang="ts">
const runtime = useRuntimeConfig();

</script>

<template>
    <NuxtLayout name="default">
        <div class="w-100 lg:max-w-screen-lg bg-white px-3 lg:px-5 mx-auto flex-1 flex flex-col">
            <h1 class="text-3xl font-bold py-6">
                {{ runtime.public.APP_NAME }}
            </h1>
            <p class="text-xl">
                Coronavirus disease 2019 (COVID-19) is a respiratory illness that can spread from person to person. The
                virus
                that causes COVID-19 is a novel coronavirus that was first identified during an investigation into an
                outbreak
                in Wuhan, China
            </p>
            <h1 class="text-3xl font-bold py-6">Application</h1>
            <p class="text-xl">
                To visualize covid19&nbsp;
                <i>Confirmed cases, Deaths, Recovered.</i>
            </p>
            <div class="pt-3 text-xl">
                <p>
                    <strong>Charts of Covid19 cases</strong>&nbsp;can be assessed better by using a graph. The use of a
                    graph
                    will present data in a quick way, lift out the most important facts and will be easily remembered.
                    &nbsp;hopefully this can help you keep track of this global pandemic.
                </p>
                <p class="mt-4">
                    <strong>Word map with affected countries.</strong>
                    &nbsp;Maps are the essential tools for
                    geographical information visualization.
                    &nbsp;Quantitatively mapping the spatial distributions of infectious diseases is key to both
                    investigating their epidemiology and identifying populations at risk of infection.
                </p>
            </div>
            <h1 class="text-3xl font-bold py-6">Data source</h1>
            <div>
                <h6 class="text-2xl">World Health Organization</h6>
                <a class="text-xl" href="https://covid19.who.int/data/" target="_blank">https://covid19.who.int/data/</a>

                <h6 class="text-2xl mt-6">Central for Disease Control and Prevention</h6>
                <a class="text-xl" href="https://open.cdc.gov/apis.html" target="_blank">https://open.cdc.gov/apis.html</a>

                <h6 class="text-2xl mt-6">Office of Disease Prevention and Health Promotion </h6>
                <a class="text-xl" href="https://health.gov" target="_blank">https://health.gov</a>
            </div>
        </div>
        
        <FooterBar />
    </NuxtLayout>
</template>