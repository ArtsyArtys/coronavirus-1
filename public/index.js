import App from '../client'

if ('serviceWorker' in navigator) {
  console.log('service worker in navigator', navigator.serviceWorker);
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('./service-worker.js', { scope: './'}).then(function(registration) {
      // Registration was successful
      console.log(registration.scope);
      console.log('Registered!')
      }, function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err)
      }).catch(function(err) {
      console.log(err)
      })
    })
} else {
  console.log('service worker is not supported');
}

self.addEventListener('install', function(event) {
  console.log('Install!', event)
  event.waitUntil(
    caches.open('static-files').then(function(cache) {
      return cache.add('/')
    })
  )
  console.log(caches.open('static-files'))
})
self.addEventListener("activate", event => {
  console.log('Activate!', event)
})
self.addEventListener('fetch', function(event) {
  console.log('Fetch!', event.request)
  // console.log(navigator.serviceWorker)
})


export default App
