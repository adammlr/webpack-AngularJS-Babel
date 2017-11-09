describe('Devices Route Spec', function () {
    'use strict';

    beforeEach(angular.mock.module('storefront.common'));
    beforeEach(angular.mock.module('storefront.account'));

    let ascendonService, controller, $q, $rootScope, messageFactory;

    describe('When devices are returned', () => {
        beforeEach(function () {
            injectDependencies();
            spyOn(ascendonService.subscriber.device, 'retrieveDevices').and.returnValue($q.when({Devices: []}));
            controller.$onInit();
        });

        it('then devices should be available', () => {
            $rootScope.$apply();
            expect(controller.devices).toEqual([]);
        });
    });

    describe('When retrieveDevices fails', () => {
        beforeEach(function () {
            injectDependencies();
            spyOn(ascendonService.subscriber.device, 'retrieveDevices').and.returnValue($q.reject());
            spyOn(messageFactory, 'showGlobalError');
            controller.$onInit();
        });

        it('then an error message should be displayed', () => {
            $rootScope.$apply();
            expect(messageFactory.showGlobalError).toHaveBeenCalled();
        });
    });

    describe('When saveDevice is called', () => {
        beforeEach(function () {
            injectDependencies();
            spyOn(ascendonService.subscriber.device, 'updateDevice').and.returnValue($q.when());
            controller.$onInit();
            controller.saveDevice({Id: 1});
        });

        it('then the service should be called to persist changes', () => {
            expect(ascendonService.subscriber.device.updateDevice).toHaveBeenCalledWith({SubscriberDevice: {Id: 1}});
        });
    });

    describe('Given the user has devices', () => {
        beforeEach(function () {
            injectDependencies();
            spyOn(ascendonService.subscriber.device, 'unregisterDevice').and.returnValue($q.when());
            spyOn(messageFactory, 'showGlobalError');
            controller.$onInit();
            controller.devices = [{DeviceId: 1}, {DeviceId: 2}];
        });

        describe('When remove device is called', () => {
            beforeEach(function () {
                controller.removeDevice(controller.devices[0]);
                $rootScope.$apply();
            });

            it('Then the device should be unregistered', () => {
                expect(ascendonService.subscriber.device.unregisterDevice).toHaveBeenCalledWith({DeviceId: 1});
            });

            it('Then the device should not be in the list', () => {
                expect(controller.devices.length).toBe(1);
            });

            it('Then the editing id should be null', () => {
                expect(controller.editingId).toBe(null);
            });
        });

        describe('When remove device is called but fails', () => {
            beforeEach(function () {
                controller.removeDevice({});
                $rootScope.$apply();
            });

            it('Then an error should be displayed', () => {
                expect(messageFactory.showGlobalError).toHaveBeenCalled();
            });

            it('Then the editing id should be null', () => {
                expect(controller.editingId).toBe(null);
            });
        });
    });


    describe('When edit mode is started', () => {
        beforeEach(function () {
            injectDependencies();
            controller.$onInit();
            controller.startEdit(1);
        });

        it('Then the editing id should be set', () => {
            expect(controller.editingId).toBe(1);
        });
    });

    describe('When edit mode is cancelled', () => {
        beforeEach(function () {
            injectDependencies();
            controller.$onInit();
            controller.editingId = 1;
            controller.cancelEdit();
        });

        it('Then the editing id should be null', () => {
            expect(controller.editingId).toBe(null);
        });
    });

    function injectDependencies() {
        inject(function (_$componentController_, _ascendonService_, _$q_, _$rootScope_, _messageFactory_) {
            const componentController = _$componentController_;
            ascendonService = _ascendonService_;
            $q = _$q_;
            $rootScope = _$rootScope_;
            messageFactory = _messageFactory_;

            controller = componentController('sfDevicesRoute', null, null);
        });
    }
});
