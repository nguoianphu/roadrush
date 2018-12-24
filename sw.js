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
        navigator.serviceWorker.register('/sw.js', {scope: '/'})
          .then(registration => {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }).catch(err => {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
  }
  
  const version = '1.5'; /* Name your cache  */
  const filesToCache = [				 /* Files you wan to store in cache */
    '/',
    '/index.html',
    '/audio/boom.mp3',
    '/audio/boom.ogg',
    '/audio/random-race.mp3',
    '/audio/random-race.ogg',
    '/audio/whoosh.mp3',
    '/audio/whoosh.ogg',
    '/images/ui/buttons/1/1.png',
    '/images/ui/buttons/1/2.png',
    '/images/ui/buttons/1/3.png',
    '/images/ui/buttons/1/4.png',
    '/images/ui/buttons/1/5.png',
    '/images/ui/buttons/1/6.png',
    '/images/ui/buttons/2/1.png',
    '/images/ui/buttons/2/2.png',
    '/images/ui/buttons/2/3.png',
    '/images/ui/buttons/2/4.png',
    '/images/ui/buttons/2/5.png',
    '/images/ui/buttons/2/6.png',
    '/images/ui/icons/music_off.png',
    '/images/ui/icons/music_on.png',
    '/images/ui/icons/sfx_off.png',
    '/images/ui/icons/sfx_on.png',
    '/images/ui/toggles/1.png',
    '/images/ui/toggles/2.png',
    '/images/ui/toggles/3.png',
    '/images/ui/toggles/4.png',
    '/images/ui/toggles/5.png',
    '/images/ui/toggles/6.png',
    '/images/barrier.png',
    '/images/cars.png',
    '/images/cone.png',
    '/images/line.png',
    '/images/pcar1.png',
    '/images/pcar2.png',
    '/images/road.jpg',
    '/images/title.png',
    '/images/titleBack.jpg',
    '/js/classes/comps/bar.js',
    '/js/classes/comps/scoreBox.js',
    '/js/classes/mc/controller.js',
    '/js/classes/mc/model.js',
    '/js/classes/ui/flatButtons.js',
    '/js/classes/ui/soundButtons.js',
    '/js/classes/ui/toggleButton.js',
    '/js/classes/util/align.js',
    '/js/classes/util/alignGrid.js',
    '/js/classes/util/collision.js',
    '/js/classes/util/mediaManager.js',
    '/js/classes/road.js',
    '/js/classes/scenes/sceneLoad.js',
    '/js/classes/scenes/sceneMain.js',
    '/js/classes/scenes/sceneOver.js',
    '/js/classes/scenes/sceneTitle.js',
    '/js/constants.js',
    '/js/main.js',
    '/js/phaser.min.js',
    '/sw.js'
  ];
  
  // delete previous caches
  self.addEventListener('activate', e => {
    let cachecleaned = caches.keys().then(keys => {
      keys.forEach(key => {
        if(key !== `road-rush : v${version}` && key.match(`road-rush : v`)) return caches.delete(key)
      })
    })
  })
  
  // install service worker 
  self.addEventListener('install', e => {
    console.log('sw install');
    e.waitUntil(
      caches.open(`road-rush : v${version}`).then(function(cache) {
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
      caches.open(`road-rush : v${version}`).then(cache => {
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
  
  