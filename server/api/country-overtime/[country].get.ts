export default defineEventHandler(async (event): Promise<CountryOvertimeCase | undefined> => {
  const alpha2 = event.context.params?.country
  const countries = await useStorage('myFileSystem').getItem('countries-overtime-case.json') as CountryOvertimeCase[];

  // await useStorage("myFileSystem").setItem("acountries-overtime-case.json", countries.reverse());
  return countries.find(country => country.countryCode === alpha2);
});