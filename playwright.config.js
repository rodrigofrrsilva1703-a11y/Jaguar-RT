const {defineConfig}=require('@playwright/test');
module.exports=defineConfig({
 testDir:'./tests',
 testMatch:'browser.spec.js',
 timeout:30000,
 use:{headless:true},
 reporter:[['list']]
});
