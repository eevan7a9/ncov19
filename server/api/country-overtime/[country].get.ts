export default defineEventHandler(async (event): Promise<CountryOvertimeCase | undefined> => {
  const alpha2 = event.context.params?.country
  const countries = await useStorage('myFileSystem').getItem('countries-overtime-case.json') as CountryOvertimeCase[];
  const foundCountry = countries.find(country => country.countryCode === alpha2);
  // console.log("foundCountry", foundCountry)

  return foundCountry

})