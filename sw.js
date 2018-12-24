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
        navigator.serviceWorker.register('/roadrush/sw.js', {scope: '/roadrush/'})
          .then(registration => {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }).catch(err => {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
  }
  
  const version = '1.5'; /* Name your cache  */
  const filesToCache = [				 /* Files you wan to store in cache */
    '/roadrush/roadrush/',
    '/roadrush/index.html',
    '/roadrush/audio/boom.mp3',
    '/roadrush/audio/boom.ogg',
    '/roadrush/audio/random-race.mp3',
    '/roadrush/audio/random-race.ogg',
    '/roadrush/audio/whoosh.mp3',
    '/roadrush/audio/whoosh.ogg',
    '/roadrush/images/ui/buttons/1/1.png',
    '/roadrush/images/ui/buttons/1/2.png',
    '/roadrush/images/ui/buttons/1/3.png',
    '/roadrush/images/ui/buttons/1/4.png',
    '/roadrush/images/ui/buttons/1/5.png',
    '/roadrush/images/ui/buttons/1/6.png',
    '/roadrush/images/ui/buttons/2/1.png',
    '/roadrush/images/ui/buttons/2/2.png',
    '/roadrush/images/ui/buttons/2/3.png',
    '/roadrush/images/ui/buttons/2/4.png',
    '/roadrush/images/ui/buttons/2/5.png',
    '/roadrush/images/ui/buttons/2/6.png',
    '/roadrush/images/ui/icons/music_off.png',
    '/roadrush/images/ui/icons/music_on.png',
    '/roadrush/images/ui/icons/sfx_off.png',
    '/roadrush/images/ui/icons/sfx_on.png',
    '/roadrush/images/ui/toggles/1.png',
    '/roadrush/images/ui/toggles/2.png',
    '/roadrush/images/ui/toggles/3.png',
    '/roadrush/images/ui/toggles/4.png',
    '/roadrush/images/ui/toggles/5.png',
    '/roadrush/images/ui/toggles/6.png',
    '/roadrush/images/barrier.png',
    '/roadrush/images/cars.png',
    '/roadrush/images/cone.png',
    '/roadrush/images/line.png',
    '/roadrush/images/pcar1.png',
    '/roadrush/images/pcar2.png',
    '/roadrush/images/road.jpg',
    '/roadrush/images/title.png',
    '/roadrush/images/titleBack.jpg',
    '/roadrush/js/classes/comps/bar.js',
    '/roadrush/js/classes/comps/scoreBox.js',
    '/roadrush/js/classes/mc/controller.js',
    '/roadrush/js/classes/mc/model.js',
    '/roadrush/js/classes/ui/flatButtons.js',
    '/roadrush/js/classes/ui/soundButtons.js',
    '/roadrush/js/classes/ui/toggleButton.js',
    '/roadrush/js/classes/util/align.js',
    '/roadrush/js/classes/util/alignGrid.js',
    '/roadrush/js/classes/util/collision.js',
    '/roadrush/js/classes/util/mediaManager.js',
    '/roadrush/js/classes/road.js',
    '/roadrush/js/classes/scenes/sceneLoad.js',
    '/roadrush/js/classes/scenes/sceneMain.js',
    '/roadrush/js/classes/scenes/sceneOver.js',
    '/roadrush/js/classes/scenes/sceneTitle.js',
    '/roadrush/js/constants.js',
    '/roadrush/js/main.js',
    '/roadrush/js/phaser.min.js',
    '/roadrush/sw.js'
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
  
  
