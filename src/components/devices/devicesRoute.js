import './devices.less';
import html from './devicesRoute.html';

/* @ngInject */
function devicesRouteController($rootScope) {
    // let removeErrorMessage;
    // let updateErrorMessage;
    // let retrieveErrorMessage;

    const controller = this;

    controller.$onInit = () => {
        Object.assign(controller, {
            saveDevice,
            removeDevice,
            startEdit,
            cancelEdit
        });

        $rootScope.pageLoading = true;
        controller.editingId = null;

        // ascendonService.subscriber.device.retrieveDevices().then((response) => {
        //     controller.devices = response.Devices;
        // }).catch(() => {
        //     messageFactory.showGlobalError(retrieveErrorMessage);
        // }).finally(() => {
        //     $rootScope.pageLoading = false;
        //     controller.loaded = true;
        // });
        //
        // $translate(['account.device.updateFail', 'account.device.removeFail', 'account.device.retrieveFail']).then(function (translations) {
        //     updateErrorMessage = translations['account.device.updateFail'];
        //     removeErrorMessage = translations['account.device.removeFail'];
        //     retrieveErrorMessage = translations['account.device.retrieveFail'];
        // });
    };

    function saveDevice() {
        $rootScope.pageLoading = true;
        // ascendonService.subscriber.device.updateDevice({
        //     SubscriberDevice: device
        // }).catch(() => {
        //     messageFactory.showGlobalError(updateErrorMessage);
        // }).finally(() => {
        //     $rootScope.pageLoading = false;
        //     controller.editingId = null;
        // });
    }

    function removeDevice() {
        $rootScope.pageLoading = true;
        // ascendonService.subscriber.device.unregisterDevice({
        //     DeviceId: device.DeviceId
        // }).then(() => {
        //     const index = controller.devices.indexOf(device);
        //     controller.devices.splice(index, 1);
        // }).catch(() => {
        //     messageFactory.showGlobalError(removeErrorMessage);
        // }).finally(() => {
        //     $rootScope.pageLoading = false;
        //     controller.editingId = null;
        // });
    }

    function startEdit(id) {
        controller.editingId = id;
    }

    function cancelEdit() {
        controller.editingId = null;
    }
}

export default {
    template: html,
    bindings: {},
    controller: devicesRouteController
};
