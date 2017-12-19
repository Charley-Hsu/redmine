# redmine 新框架

> A project base on node.js koa2 vue2 mysql

## Build Setup

``` bash
# install dependencies
npm install

# koa2 serve with hot reload at localhost:8889
npm run server

# build the program
npm run dev
```
## Notice

 #### error：please install mysql2 package manually
``` bash
$ npm install --save sequelize
# And the following:
$ npm install --save mysql2

$ npm install --g sequelize mysql
$ npm install --g sequelize-auto 

```
 Error: Cannot resolve module 'net' on node_modules/joi/lib @ ./~/joi/lib/string.js 3:10-24
``` bash
    node: {
      net: 'empty',
      tls: 'empty',
      dns: 'empty'
    }
```
add these in the webpack.config.

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
