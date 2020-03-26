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

export default App
