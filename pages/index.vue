<script lang="ts" setup>
import { storeToRefs } from "pinia";

const covidCasesStore = useCovidCasesStore();
const { globalCases } = storeToRefs(covidCasesStore);
const route = useRoute();
const router = useRouter();
const showCountryDetails = ref(false);

onMounted(() => {
  const { alpha2 } = route.query;
  if (alpha2) {
    showCountryDetails.value = !!alpha2;
  }
});

function closeCountryModal() {
  const query = Object.assign({}, route.query);
  delete query.alpha2;
  router.replace({ query });
  showCountryDetails.value = false;
}

watch(
  () => route.query,
  (newVal) => {
    const { alpha2 } = newVal;
    if (alpha2) {
      showCountryDetails.value = !!alpha2;
    }
  }
);
</script>

<template>
  <NuxtLayout name="dashboard">
    <div class="flex-1 flex flex-col relative h-full bg-red-50">
      <div class="h-full md:max-h-[calc(100vh_-_55px)] relative flex-1 md:grid md:grid-cols-1 md:grid-rows-1">
        <section class="z-0 h-[60vh] md:h-full md:col-span-3">
          <WorldMap class="h-full " v-if="globalCases.length" />
        </section>

        <section
          class="z-10 h-auto md:h-full bg-[#aad3df] bg-opacity-2 flex flex-col gap-y-3 w-full md:max-w-[300px] lg:max-w-[400px] md:absolute top-0 right-0 overflow-hidden py-1 px-1 md:pr-2">
          <SidebarTopCasesList class="h-auto md:h-[50%] md:max-h-full md:row-span-1" />
          <SidebarCdcArticles class="h-auto md:h-[50%] md:max-h-full md:row-span-1" />
        </section>
      </div>

      <ModalsCountryDetails @close="closeCountryModal" v-if="showCountryDetails" />
    </div>
    <FooterBar class="md:hidden" />
  </NuxtLayout>
</template>

<style lang="scss" scoped></style>