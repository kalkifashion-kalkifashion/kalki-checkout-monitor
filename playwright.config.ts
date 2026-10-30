import 'dotenv/config';
import {defineConfig,devices,type Project} from '@playwright/test';
import {sites} from './src/sites';
const projects:Project[]=Object.values(sites).flatMap(site=>[
 {name:`${site.id}-desktop-guest`,grep:/@guest/,metadata:{siteId:site.id,accountMode:'guest',viewportProfile:'desktop'},use:{...devices['Desktop Chrome']}},
 {name:`${site.id}-mobile-guest`,grep:/@guest/,metadata:{siteId:site.id,accountMode:'guest',viewportProfile:'mobile'},use:{...devices['Pixel 7']}},
 {name:`${site.id}-desktop-signed-in`,grep:/@signed-in/,metadata:{siteId:site.id,accountMode:'signed-in',viewportProfile:'desktop'},use:{...devices['Desktop Chrome']}},
 {name:`${site.id}-mobile-signed-in`,grep:/@signed-in/,metadata:{siteId:site.id,accountMode:'signed-in',viewportProfile:'mobile'},use:{...devices['Pixel 7']}}
]);
export default defineConfig({testDir:'./tests',fullyParallel:true,forbidOnly:!!process.env.CI,retries:process.env.CI?1:0,workers:Number(process.env.MONITOR_MAX_WORKERS??(process.env.CI?2:4)),timeout:Number(process.env.MONITOR_TIMEOUT_MS??120000),expect:{timeout:15000},reporter:process.env.CI?[['list'],['html',{outputFolder:'playwright-report',open:'never'}],['./src/slack-reporter.ts']]:[['list'],['html',{outputFolder:'playwright-report',open:'never'}]],use:{actionTimeout:20000,navigationTimeout:45000,trace:'retain-on-failure',screenshot:'only-on-failure',video:'retain-on-failure'},projects});
