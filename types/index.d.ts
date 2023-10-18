/**
 * No need to export interfaces are auto import in the project
 */
interface Country {
    countryCode: string,
    country: string,
    whoRegion: string
}

interface CountriesTotalCase {
    whoRegion: string,
    name: string,
    countryCode?: string,
    latlng?: string[] | number[],
    casesCumulativeTotal: string,
    casesCumulativeTotalPer100000Population: string,
    casesNewlyReportedInLast7Days?: string,
    casesNewlyReportedInLast7DaysPer100000Population?: string,
    casesNewlyReportedInLast24Hours?: string,
    deathsCumulativeTotal?: string,
    deathsCumulativeTotalPer100000Population?: string,
    deathsNewlyReportedInLast7Days?: string,
    deathsNewlyReportedInLast7DaysPer100000Population?: string,
    deathsNewlyReportedInLast24Hours?: string
}

interface GeoFeature {
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
}

interface CountriesGeoJSON {
    type: string;
    features: GeoFeature[]
}

interface CountryOvertimeCase {
    country: string;
    countryCode: string;
    data: {
        date: string;
        countryCode: string;
        country: string;
        whoRegion: string;
        newCases: string | number;
        cumulativeCases: string | number;
        newDeaths: string | number;
        cumulativeDeaths: string | number;
    }[]
}