export interface Youtube2 {
    kind:     string;
    etag:     string;
    pageInfo: PageInfo;
    items:    Item[];
}

export interface Item {
    kind:             string;
    etag:             string;
    id:               string;
    snippet:          Snippet;
    contentDetails:   ContentDetails;
    statistics:       Statistics;
    brandingSettings: BrandingSettings;
}

export interface BrandingSettings {
    channel: Channel;
    image:   Image;
}

export interface Channel {
    title:               string;
    description:         string;
    keywords:            string;
    moderateComments:    boolean;
    unsubscribedTrailer: string;
    country:             string;
}

export interface Image {
    bannerExternalUrl: string;
}

export interface ContentDetails {
    relatedPlaylists: RelatedPlaylists;
}

export interface RelatedPlaylists {
    likes:   string;
    uploads: string;
}

export interface Snippet {
    title:       string;
    description: string;
    customUrl:   string;
    publishedAt: string;
    thumbnails:  Thumbnails;
    localized:   Localized;
    country:     string;
}

export interface Localized {
    title:       string;
    description: string;
}

export interface Thumbnails {
    default: Default;
    medium:  Default;
    high:    Default;
}

export interface Default {
    url:    string;
    width:  number;
    height: number;
}

export interface Statistics {
    viewCount:             string;
    subscriberCount:       string;
    hiddenSubscriberCount: boolean;
    videoCount:            string;
}

export interface PageInfo {
    totalResults:   number;
    resultsPerPage: number;
}
