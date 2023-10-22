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

// https://tools.cdc.gov/api/v2/resources/media?languageisocode=eng
interface CDCMedia {
    id: number;
    url: string;
    name: string;
    subTitle?: null;
    description?: string;
    mediaType?: string;
    language?: {
        name?: string;
        isoCode?: string;
        isoCode2?: string;
    };
    tags?: {
        id?: number;
        name?: string;
        language?: string;
        type?: string;
    }[];
    geoTags?: any[];
    campaigns?: any[];
    source?: {
        name?: string;
        acronym?: string;
        websiteUrl?: string;
        largeLogoUrl?: string;
        smallLogoUrl?: string;
    };
    attribution?: string;
    domainName?: string;
    owningOrgName?: string;
    owningOrgId?: string;
    maintainingOrgName?: string;
    maintainingOrgId?: string;
    sourceUrl?: string;
    targetUrl?: string;
    persistentUrlToken?: string;
    persistentUrl?: string;
    embedUrl?: string;
    syndicateUrl?: string;
    contentUrl?: string;
    thumbnailUrl?: string;
    alternateImages?: {
        id?: number;
        name?: string;
        width?: number;
        height?: number;
        url?: string;
        type?: string;
    }[];
    alternateText?: string;
    noScriptText?: string;
    featuredText?: string;
    embedCode?: string;
    author?: string;
    length?: string;
    size?: null;
    height?: null;
    width?: null;
    childCount?: number;
    children?: null;
    parentCount?: number;
    parents?: any[];
    rating?: null;
    ratingCount?: null;
    ratingCommentCount?: null;
    status?: string;
    datePublished?: string;
    dateModified?: string;
    dateContentAuthored?: string;
    dateContentUpdated?: string;
    dateContentPublished?: string;
    dateContentReviewed?: string;
    dateSyndicationCaptured?: string;
    dateSyndicationUpdated?: string;
    dateSyndicationVisible?: string;
    extendedAttributes?: {};
    extension?: {};
    pageCount?: string;
    dataSize?: null;
    durationSeconds?: null;
    enclosures?: any[];
    omnitureChannel?: null;
    isTopSyndicated?: string;
}

// https://tools.cdc.gov/api/v3/resources/media/129853/syndicate.json
interface CDCMediaSyndicate {
    meta: {
        status: number,
        message: string[],
        resultSet: {
            id: string
        },
        pagination: {
            total?: number,
            count?: number,
            max?: number,
            offset?: number,
            pageNum?: number,
            totalPages?: number,
            sort?: null,
            previousUrl?: string,
            currentUrl?: string,
            nextUrl?: string
        }
    },
    results: {
        mediaId: number,
        mediaType: string,
        name: string,
        description: string,
        sourceUrl: string,
        targetUrl: string,
        content: string,
        templateVersion?: string
    }
}

interface CDCMeta {
    status: number;
    message: any[];
    resultSet: {
        id?: string;
    };
    pagination: {
        total: number;
        count: number;
        max: number;
        offset: number;
        pageNum: number;
        totalPages: number;
        sort: string;
        previousUrl: string;
        currentUrl: string;
        nextUrl: string;
    };
}

interface HealthArticle {
    Type: string;
    Id: string;
    Title: string;
    ParentId: number;
    TranslationId: string;
}

interface ArticlesRes {
    Error: string;
    Total: number;
    Query: {
        ApiVersion?: string;
        ApiType?: string;
        TopicId?: string;
        ToolId?: string;
        CategoryId?: string;
        PopulationId?: string;
        Keyword?: string;
        Who?: string;
        Age?: number;
        Sex?: string;
        Pregnant?: string;
        TobaccoUse?: string;
        SexuallyActive?: string;
        Category?: string;
        Lang?: string;
        Type?: string;
        ReturnType?: string;
        Callback?: string;
        HealthfinderPage?: number;
        APiType?: string;
    };
    Language?: string;
    Items: {
        Item: HealthArticle[];
    };
}

interface HealthSection {
    Title: string;
    Description: string;
    Content: string;
}

interface HealthGovRes {
    Result: {
        Error: string;
        Total: number;
        Query: {
            ApiVersion: string;
            ApiType: string;
            TopicId: string;
            ToolId: null;
            CategoryId: null;
            PopulationId: null;
            Keyword: null;
            Who: null;
            Age: null;
            Sex: null;
            Pregnant: null;
            TobaccoUse: null;
            SexuallyActive: null;
            Category: null;
            Lang: string;
            Type: null;
            ReturnType: string;
            Callback: null;
            HealthfinderPage: null;
            APiType: string;
        };
        Language: string;
        Resources: {
            Resource: [
                {
                    Type: string;
                    Id: string;
                    Title: string;
                    TranslationId: string;
                    TranslationTitle: string;
                    Categories: string;
                    Populations: string;
                    MyHFTitle: string;
                    MyHFDescription: string;
                    MyHFCategory: string;
                    MyHFCategoryHeading: string;
                    LastUpdate: string;
                    ImageUrl: string;
                    ImageAlt: string;
                    AccessibleVersion: string;
                    RelatedItems: {
                        RelatedItem: [
                            {
                                Type: string;
                                Id: string;
                                Title: string;
                                Url: string;
                            }
                        ];
                    };
                    Sections: {
                        section: HealthSection[];
                    };
                    MoreInfoItems: null;
                    HealthfinderLogo: string;
                    HealthfinderUrl: string;
                }
            ];
        };
    };
}