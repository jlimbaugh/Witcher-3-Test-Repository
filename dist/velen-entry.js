'use strict';
/* Keep historical links working while rendering Velen inside the shared shell. */
(()=>{const destination='index.html'+window.PhoenixVelenRouting.sharedHash(location.hash);document.querySelector('[data-velen-entry]').href=destination;location.replace(destination);})();
