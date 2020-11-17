import Mock from 'mockjs'
import drawer from './drawer'
import dashboard from './views/dashboard'
import articles from './views/articles'
import formData from './data/formData'
import listData from './data/listData'
import article from './views/article'
import test from './views/test'
import mediaFolders from './medias/mediaFolders'
import medias from './medias/medias'
import modules from './data/modulesData'

window.idSeed = 100;

function createId(){
    window.idSeed = window.idSeed + 1;
    return window.idSeed;
}

function getQueryVariable(name, oldUrl) {
  const url = decodeURI(oldUrl); // 获取url中"?"符后的字串(包括问号)
  //let query = {};
  if (url.indexOf("?") !== -1) {
      const str = url.substr(url.indexOf("?") + 1);
      const pairs = str.split("&");
      for(let i = 0; i < pairs.length; i ++) {
           const pair = pairs[i].split("=");
           
           if(pair[0] === name) return  pair[1]; // 返回 参数值
      }
  }
 return(false);
}


Mock.mock('/api/drawer', 'get', drawer)
Mock.mock('/api/page/dashboard', 'get', dashboard)
Mock.mock('/api/data/article', 'get', formData)
Mock.mock('/api/page/articles', 'get', articles)
Mock.mock('/api/page/article', 'get', article)
Mock.mock('/api/page/test', 'get', test)
Mock.mock('/api/moudle-index/articles', 'get', 'articles')
Mock.mock(RegExp('/api/data/list?.*'), 'get', listData)
Mock.mock('/api/medias/folders', mediaFolders)
Mock.mock(RegExp('/api/medias/medias?.*'),'get', medias)
Mock.mock('/api/medias/add-folder','post', {id:()=>createId(), name:"new folder"})
Mock.mock('/api/medias/change-folder','post')
Mock.mock(RegExp('/api/medias/remove-folder?.*'),'post')
Mock.mock(RegExp('/api/medias/move-to-folder?.*'),'post')
Mock.mock(RegExp('/api/medias/change-media-name?.*'),'post')
Mock.mock(RegExp('/api/medias/remove-media?.*'),'post')
Mock.mock(RegExp('/api/medias/remove-medias?.*'),'post')
Mock.mock(RegExp('/api/medias/move-media-to?.*'),'post')

Mock.mock('/api/base/items','get', [
    {
        id:'base1',
        name:'条目1',
      },
      {
        id:'base2',
        name:'条目2',
      },
      {
        id:'base3',
        name:'条目3',
      },
])

Mock.mock('/api/modules','get', modules)
Mock.mock(RegExp('/api/change-module?.*'),'post', (request)=>{
  let id = getQueryVariable('id', request.url);
  let title = getQueryVariable('title', request.url);
  modules.forEach(module=>{
    if(module.id === id){
      module.title = title;
    }

  })

  return [...modules]
})

Mock.mock(RegExp('/api/remove-module?.*'),'post', (request)=>{
  let index = -1;
  let id = getQueryVariable('id', request.url);
  modules.forEach((module, i)=>{
    if(module.id === parseInt(id)){
      index = i
    }

  })

  if(index > -1){
    modules.splice(index, 1);
  }

  return [...modules]
})

Mock.mock('/api/add-module','post', (request)=>{
  modules.push({id:createId(), title:'New Module'})
  return [...modules]
})

Mock.mock(RegExp('/api/get-module-by-id?.*'),'get', (request)=>{
  let id = parseInt(getQueryVariable('id', request.url));
  for(var i = 0; i < modules.length; i++){
    if(modules[i].id === id){
      return modules[i];
    }
  }
})

Mock.mock('/api/update-module-page','post', (request)=>{
  return true;
})

Mock.mock('/api/remove-module-page','post', (request)=>{
  return true;
})

Mock.setup({
    timeout: 500
})