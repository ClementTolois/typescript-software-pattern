import ServiceLocator from "../core/ServiceLocator";

beforeEach(() => {
    ServiceLocator.getInstance().removeAllServices();
});

describe("ServiceLocator implementation tests", () => {
    test("ServiceLocator should be a singleton", () => {
        const serviceLocator1 = ServiceLocator.getInstance();
        const serviceLocator2 = ServiceLocator.getInstance();
        expect(serviceLocator1).toBe(serviceLocator2);
    });

    test("ServiceLocator should register and retrieve a service", () => {
        const serviceLocator = ServiceLocator.getInstance();
        serviceLocator.registerService("testService", "testService");
        const service = serviceLocator.getService("testService");
        expect(service).toBe("testService");
    });

    test("ServiceLocator should throw an error when retrieving a non-existent service", () => {
        const serviceLocator = ServiceLocator.getInstance();
        expect(() => serviceLocator.getService("nonExistentService")).toThrowError("Service nonExistentService not found");
    });

    test("ServiceLocator should throw an error when registering a service with an existing name", () => {
        const serviceLocator = ServiceLocator.getInstance();
        serviceLocator.registerService("testService", "testService");
        expect(() => serviceLocator.registerService("testService", "testService")).toThrowError("Service testService already registered");
    });

    test("ServiceLocator should remove a service", () => {
        const serviceLocator = ServiceLocator.getInstance();
        serviceLocator.registerService("testService", "testService");
        serviceLocator.removeService("testService");
        expect(() => serviceLocator.getService("testService")).toThrowError("Service testService not found");
    });

    test("ServiceLocator should remove all services", () => {
        const serviceLocator = ServiceLocator.getInstance();
        serviceLocator.registerService("testService1", "testService1");
        serviceLocator.registerService("testService2", "testService2");
        serviceLocator.removeAllServices();
        expect(() => serviceLocator.getService("testService1")).toThrowError("Service testService1 not found");
        expect(() => serviceLocator.getService("testService2")).toThrowError("Service testService2 not found");
    });
});