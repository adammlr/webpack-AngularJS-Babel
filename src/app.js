import angular from 'angular';
import registrationModule from './components/registration/registration.module';
import devicesModule from './components/devices/devices.module';

/* @ngInject */
function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('app', {
            url: '/',
            views: {
                'content@': {template: '<registration-route></registration-route>'},
            },
        })
        .state('devices', {
            url: '/devices',
            views: {
                'content@': {template: '<devices-route></devices-route>'},
            },
        });
}

angular.module('ui.main', [
    registrationModule,
    devicesModule,
    'ui.router',
//  'pascalprecht.translate',
]).config(config);
