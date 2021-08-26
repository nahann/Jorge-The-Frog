export interface Google {
    kind:              string;
    url:               URL;
    queries:           Queries;
    context:           Context;
    searchInformation: SearchInformation;
    items:             Item[];
}

export interface Context {
    title: string;
}

export interface Item {
    kind:             Kind;
    title:            string;
    htmlTitle:        string;
    link:             string;
    displayLink:      DisplayLink;
    snippet:          string;
    htmlSnippet:      string;
    cacheId:          string;
    formattedUrl:     string;
    htmlFormattedUrl: string;
    pagemap?:         Pagemap;
}

export enum DisplayLink {
    WWWGoogleCOM = "www.google.com",
}

export enum Kind {
    CustomsearchResult = "customsearch#result",
}

export interface Pagemap {
    cse_thumbnail?: CSEThumbnail[];
    metatags:       { [key: string]: string }[];
    cse_image?:     CSEImage[];
    website?:       Place[];
    place?:         Place[];
    thing?:         Thing[];
    hcard?:         Hcard[];
    person?:        Person[];
    article?:       Article[];
}

export interface Article {
    image:         string;
    articlebody:   string;
    name:          string;
    datepublished: string;
}

export interface CSEImage {
    src: string;
}

export interface CSEThumbnail {
    src:    string;
    width:  string;
    height: string;
}

export interface Hcard {
    role: string;
    fn:   string;
}

export interface Person {
    role?:  string;
    image?: string;
    name?:  string;
}

export interface Place {
    image:       string;
    name:        string;
    description: string;
    url?:        string;
}

export interface Thing {
    name:        string;
    description: string;
}

export interface Queries {
    request:  NextPage[];
    nextPage: NextPage[];
}

export interface NextPage {
    title:          string;
    totalResults:   string;
    searchTerms:    string;
    count:          number;
    startIndex:     number;
    inputEncoding:  string;
    outputEncoding: string;
    safe:           string;
    cx:             string;
}

export interface SearchInformation {
    searchTime:            number;
    formattedSearchTime:   string;
    totalResults:          string;
    formattedTotalResults: string;
}

export interface URL {
    type:     string;
    template: string;
}
