Sample project that can be run as a standalone AngularJS SPA, OR modules can be imported via NPM in a 2nd application. 

To use in a different standalone AngularJS SPA:
"html-storefront-ui": "file:../consumerhtmlui" //package.json dev dependencies
import {RegistrationModule as regModule} from 'html-storefront-ui'; //imports the module
<registration-route></registration-route> //use the component
