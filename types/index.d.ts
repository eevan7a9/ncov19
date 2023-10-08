/**
 * No need to export interfaces are auto import in the project
 */

interface CountriesList {
    countryCode: string,
    country: string,
    whoRegion: string
}

interface CountriesTotalCase {
    whoRegion: string,
    name: string,
    casesCumulativeTotal: string,
    casesCumulativeTotalPer100000Population: string,
    casesNewlyReportedInLast7Days: string,
    casesNewlyReportedInLast7DaysPer100000Population: string,
    casesNewlyReportedInLast24Hours: string,
    deathsCumulativeTotal: string,
    deathsCumulativeTotalPer100000Population: string,
    deathsNewlyReportedInLast7Days: string,
    deathsNewlyReportedInLast7DaysPer100000Population: string,
    deathsNewlyReportedInLast24Hours: string
}

interface CountriesGeoJSON {
    type: string;
    features: {
        type: string,
        id: string,
        properties: {
            name: string,
            alpha2?: string
        },
        geometry: {
            type: string;
            coordinates: [][]
        }[]
    }[]
}