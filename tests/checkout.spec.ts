import {test} from '@playwright/test';
import {ShopperFlow} from '../src/shopper-flow';
import {siteFromProject} from '../src/sites';
import {credentialsFor,shippingFor} from '../src/test-data';
test('guest checkout reaches payment readiness @guest',async({page},info)=>{const site=siteFromProject(info.project.name);await new ShopperFlow(page,info,site).run(shippingFor(site));});
test('signed-in checkout reaches payment readiness @signed-in',async({page},info)=>{const site=siteFromProject(info.project.name),credentials=credentialsFor(site);test.skip(!credentials,`Signed-in monitor skipped: configure both ${site.emailEnv} and ${site.passwordEnv}.`);await new ShopperFlow(page,info,site).run(shippingFor(site),credentials);});
