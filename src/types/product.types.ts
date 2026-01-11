export type AffiliateUrl = {
	url: string;
	label: string;
	platform: string;
	best: boolean;
};

type Images = {
	directus_files_id: string;
}[];

type Tags = {
	tags_id: {
		// id: number;
		name: string;
	};
}[];

export type Product = {
	id: number;
	public_id: number;

	title: string;
    hook: string,
	description: string | null;

	status: "draft" | "published" | "archived";

    min_price: number;
	price_range: string;
	thumbnail: string; // Directus file UUID
	images: Images;
	tags: Tags;

	affiliate_urls: AffiliateUrl[];

	created_at: string; // ISO datetime
	updated_at: string; // ISO datetime
};
