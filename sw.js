/*
	We only need to modify 2 places:
		1. cacheName
		2. filesToCache
*/

// register service worker
// if service worker API is available
// if (navigator.serviceWorker) {
  if ('serviceWorker' in navigator) { 
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js', {scope: '/road-rush'})
          .then(registration => {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }).catch(err => {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
  }
  
  const cacheName = 'roadrush-v1'; /* Name your cache  */
  const filesToCache = [				 /* Files you wan to store in cache */
    '/',
    '/road-rush/index.html',
    '/road-rush/audio/boom.mp3',
    '/road-rush/audio/boom.ogg',
    '/road-rush/audio/random-race.mp3',
    '/road-rush/audio/random-race.ogg',
    '/road-rush/audio/whoosh.mp3',
    '/road-rush/audio/whoosh.ogg',
    '/road-rush/images/ui/buttons/1/1.png',
    '/road-rush/images/ui/buttons/1/2.png',
    '/road-rush/images/ui/buttons/1/3.png',
    '/road-rush/images/ui/buttons/1/4.png',
    '/road-rush/images/ui/buttons/1/5.png',
    '/road-rush/images/ui/buttons/1/6.png',
    '/road-rush/images/ui/buttons/2/1.png',
    '/road-rush/images/ui/buttons/2/2.png',
    '/road-rush/images/ui/buttons/2/3.png',
    '/road-rush/images/ui/buttons/2/4.png',
    '/road-rush/images/ui/buttons/2/5.png',
    '/road-rush/images/ui/buttons/2/6.png',
    '/road-rush/images/ui/icons/music_off.png',
    '/road-rush/images/ui/icons/music_on.png',
    '/road-rush/images/ui/icons/sfx_off.png',
    '/road-rush/images/ui/icons/sfx_on.png',
    '/road-rush/images/ui/toggles/1.png',
    '/road-rush/images/ui/toggles/2.png',
    '/road-rush/images/ui/toggles/3.png',
    '/road-rush/images/ui/toggles/4.png',
    '/road-rush/images/ui/toggles/5.png',
    '/road-rush/images/ui/toggles/6.png',
    '/road-rush/images/barrier.png',
    '/road-rush/images/cars.png',
    '/road-rush/images/cone.png',
    '/road-rush/images/line.png',
    '/road-rush/images/pcar1.png',
    '/road-rush/images/pcar2.png',
    '/road-rush/images/road.jpg',
    '/road-rush/images/title.png',
    '/road-rush/images/titleBack.jpg',
    '/road-rush/js/classes/comps/bar.js',
    '/road-rush/js/classes/comps/scoreBox.js',
    '/road-rush/js/classes/mc/controller.js',
    '/road-rush/js/classes/mc/model.js',
    '/road-rush/js/classes/ui/flatButtons.js',
    '/road-rush/js/classes/ui/soundButtons.js',
    '/road-rush/js/classes/ui/toggleButton.js',
    '/road-rush/js/classes/util/align.js',
    '/road-rush/js/classes/util/alignGrid.js',
    '/road-rush/js/classes/util/collision.js',
    '/road-rush/js/classes/util/mediaManager.js',
    '/road-rush/js/classes/road.js',
    '/road-rush/js/classes/scenes/sceneLoad.js',
    '/road-rush/js/classes/scenes/sceneMain.js',
    '/road-rush/js/classes/scenes/sceneOver.js',
    '/road-rush/js/classes/scenes/sceneTitle.js',
    '/road-rush/js/constants.js',
    '/road-rush/js/main.js',
    '/road-rush/js/phaser.min.js',
    '/road-rush/sw.js'
  ];
  
  // delete previous caches
  self.addEventListener('activate', e => {
    let cachecleaned = caches.keys().then(keys => {
      keys.forEach(key => {
        if(key !== cacheName) return caches.delete(key)
      })
    })
  })
  
  // install service worker 
  self.addEventListener('install', e => {
    console.log('sw install');
    e.waitUntil(
      caches.open(cacheName).then(function(cache) {
        console.log('sw caching files');
        return cache.addAll(filesToCache);
      }).catch(err => {
        console.log(err);
      })
    );
  });
  
  // Caching strategies
  self.addEventListener('fetch', e => {
    console.log('sw fetch');
    console.log(e.request.url);

    // 4. Cache with Network Update : 
    e.respondWith(
      caches.open(cacheName).then(cache => {
        return cache.match(e.request).then(res => {
          let updateRes = fetch(e.request).then(newRes => {
            cache.put(e.request, newRes.clone())
            return newRes
          })
          return res || updateRes
        })
      })
    )
   });
  
  
