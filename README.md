<h1 align="center">Electron with React Boilerplate</h1>

<h3 align="center">
    ElectronJs e ReactJs
</h3>

<p align="center">🚀 Como utilizar essas ferramentas em conjunto, para desenvolvimento preciso e ágil de aplicações desktop.</p>

<p align="center">
 <img src= "https://img.shields.io/static/v1?label=nvm&message=16.13.2&color=gree&style=flat&logo=ghost" />
 <img src= "https://img.shields.io/static/v1?label=ReactJs&message=17.0.2&color=gree&style=flat&logo=ghost" />
 <img src= "https://img.shields.io/static/v1?label=ElectronJs&message=16.0.7&color=gree&style=flat&logo=ghost"/>
 <img src= "https://img.shields.io/static/v1?label=Axios&message=0.25.0&color=gree&style=flat&logo=ghost"/>
 <img src= "https://img.shields.io/static/v1?label=Json Server&message=0.17.0&color=gree&style=flat&logo=ghost"/>
</p>
</br>

## Create Project

Para criar uma base de projeto como esse, considere:

### `create-react-app my-app`

A base do projeto é um app em ReactJs, o projeto deve ser inicializado dessa forma.

### `yarn add`

Todos os seguintes pacotes devem ser adicionados ao projeto:

> `electron @electron/remote concurrently wait-on cross-env electron-builder electron-is-dev react-router-dom`

### Scripts e package.json

Adicione aos scripts os seguintes comandos:

> `"electron:serve": "concurrently -k \"cross-env BROWSER=none yarn start\" \"yarn electron:start\"",` > `"electron:build": "yarn build && electron-builder -c.extraMetadata.main=build/main.js",` > `"electron:start": "wait-on tcp:3000 && electron .",`

Estes scripts são essenciais no ciclo da nossa aplicação, desde o desenvolvimento até o build.

- Dentro do package.json são necessárias mais algumas alterações:

-- Build:

`"build": {`
`"extends": null,`
`"appId": "com.example.electron-cra",`
`"files": [`
`"dist/**/*",`
`"build/**/*",`
`"node_modules/**/*",`
`"package.json"`
`],`
`"directories": {`
`"buildResources": "assets"`
`}`
`},`

-- Configurações:

`"main": "public/main.js",`
`"homepage": "./",`


### Processo `main.js`

Deve ser criado um main.js onde o Electron será executado para controlar nossa aplicação.

O local padrão e escolhido para esse projeto é dentro da pasta `public`. O arquivo main.js é responsável por criar nossa janela e gerir os processes e eventos ElectronJs.

É possível utilizar um preload.js em conjunto, mas apenas em casos necessários e/ou específicos de uso.

## Scripts

### `electron:serve`

No nosso caso, é o comando que inicia a aplicação desktop juntamente com a aplicação web, unindo ElectronJs e ReactJs com o `concurrently`.

### `electron:build`

Na nossa aplicação, o comando `electron:build` é responsável por gerar a build e o instalador. Sem muitas configurações e usando apenas as dependências Node.

---

# Continue aprendendo

### Vídeo tutorial

[Electron with React](https://www.youtube.com/watch?v=oAaS9ix8pes)

### Repositório boilerplate

[Electron React Boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate)

### ElectronJs

[ElectronJs Org](https://www.electronjs.org/)

### ReactJs

[React Js](https://pt-br.reactjs.org/)

---

---
