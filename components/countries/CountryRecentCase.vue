<template lang="pug">
  div.h-100.bg-light
    b-table(striped sticky-header  hover :items="items" :fields="fields" caption-top)
      template(v-slot:table-caption)
        h6.m-0.p-0.pl-1.text-secondary  Recent reports of New Cases & New Deaths.
      template(v-slot:cell(new_cases)="data")
        b(class="text-primary")  + {{ data.item.new_cases }}
      template(v-slot:cell(new_deaths)="data")
        b(class="text-danger")  + {{ data.item.new_deaths }}
</template>

<script>
export default {
  name: 'CountryRecentCase',
  data() {
    return {
      // Note `isActive` is left out and will not appear in the rendered table
      fields: [
        {
          key: 'time',
          label: 'Date Time'
        },
        'new_cases',
        'new_deaths'
      ],
      items: [
        {
          isActive: true,
          time: 40,
          new_cases: 231,
          new_deaths: 5
        },
        { isActive: false, time: 21, new_cases: 56, new_deaths: 12 },
        {
          isActive: false,
          time: 89,
          new_cases: 31,
          new_deaths: 12
        },
        { isActive: true, time: 38, new_cases: 42, new_deaths: 23 },
        {
          isActive: true,
          time: 40,
          new_cases: 14,
          new_deaths: 5
        },
        { isActive: false, time: 21, new_cases: 56, new_deaths: 12 },
        {
          isActive: false,
          time: 89,
          new_cases: 31,
          new_deaths: 12
        },
        { isActive: true, time: 38, new_cases: 42, new_deaths: 23 }
      ]
    }
  }
}
</script>

<style lang="scss" scoped></style>
