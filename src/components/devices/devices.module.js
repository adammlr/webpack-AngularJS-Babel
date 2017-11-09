import angular from 'angular';
import devicesRoute from './devicesRoute';
import deviceListItem from './deviceListItem';

export default angular.module('ui.devices', [])
    .component('devicesRoute', devicesRoute)
    .component('deviceListItem', deviceListItem)
    .name;
