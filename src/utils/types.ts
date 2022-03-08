export interface IHeroTop {
	title: string;
	sub_title: string;
	backgroundImage: string;
}

export interface ILinkItem {
	id: string;
	url: string;
}

export interface IItems {
	_uid: string;
	link: ILinkItem;
	name: string;
}

export interface Product {
	name: string;
	price: number;
}
