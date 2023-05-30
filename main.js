import './style.css'
import { setupScrollable } from './scrollable'

setupScrollable(document.querySelector('#counter'), 'scrollableMr')
const testAd = document.createElement('div');
testAd.style.height = '250px';
testAd.style.widht = '300px';
testAd.style.backgroundColor = 'red'

setTimeout(() => {
  document.getElementById('scrollableMr').appendChild(testAd);
}, 1000)