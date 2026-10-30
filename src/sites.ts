export type SiteId = 'in'|'us'|'uk'|'global';
export interface SiteConfig { id:SiteId; name:string; baseUrl:string; currency:string; productEnv:string; shippingEnv:string; emailEnv:string; passwordEnv:string; discoveryPaths:string[]; }
export const sites: Record<SiteId,SiteConfig> = {
  in:{id:'in',name:'India',baseUrl:'https://in.kalkifashion.com',currency:'INR',productEnv:'KALKI_IN_PRODUCT_URL',shippingEnv:'KALKI_IN_SHIPPING_JSON',emailEnv:'KALKI_IN_EMAIL',passwordEnv:'KALKI_IN_PASSWORD',discoveryPaths:['/collections/new-arrivals','/collections/best-sellers']},
  us:{id:'us',name:'United States',baseUrl:'https://www.kalkifashion.com',currency:'USD',productEnv:'KALKI_US_PRODUCT_URL',shippingEnv:'KALKI_US_SHIPPING_JSON',emailEnv:'KALKI_US_EMAIL',passwordEnv:'KALKI_US_PASSWORD',discoveryPaths:['/collections/new-arrivals','/collections/best-sellers']},
  uk:{id:'uk',name:'United Kingdom',baseUrl:'https://uk.kalkifashion.com',currency:'GBP',productEnv:'KALKI_UK_PRODUCT_URL',shippingEnv:'KALKI_UK_SHIPPING_JSON',emailEnv:'KALKI_UK_EMAIL',passwordEnv:'KALKI_UK_PASSWORD',discoveryPaths:['/collections/new-arrivals','/collections/best-sellers']},
  global:{id:'global',name:'Global',baseUrl:'https://global.kalkifashion.com',currency:'USD',productEnv:'KALKI_GLOBAL_PRODUCT_URL',shippingEnv:'KALKI_GLOBAL_SHIPPING_JSON',emailEnv:'KALKI_GLOBAL_EMAIL',passwordEnv:'KALKI_GLOBAL_PASSWORD',discoveryPaths:['/collections/new-arrivals','/collections/best-sellers']}
};
export function siteFromProject(name:string):SiteConfig { const site=sites[name.split('-')[0] as SiteId]; if(!site) throw new Error(`Unknown storefront: ${name}`); return site; }
