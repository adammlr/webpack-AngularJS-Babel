import html from './registrationRoute.html';
import css from './registrationRoute.less'; // eslint-disable-line

/* @ngInject */
function registrationRouteController() {
    this.$onInit = () => {

    };
}

const registrationRoute = {
    bindings: {},
    controller: registrationRouteController,
    template: html,
};

export default registrationRoute;
