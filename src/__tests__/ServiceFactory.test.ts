import { ServiceConfig } from './../core/ServiceFactory';
import ServiceFactory from "../core/ServiceFactory";
import ServiceLocator from "../core/ServiceLocator";
import Service from "../services/Service";

class TestService extends Service {
    async beforeMount(): Promise<void> {}
    async mounted(): Promise<void> {}
    async unmounted(): Promise<void> {}
}

const Services: ServiceConfig[] = [
    {
        name: "TestService",
        service: TestService,
    }
]

beforeEach(() => {
    ServiceLocator.getInstance().removeAllServices();
})

describe("ServiceFactory implementation tests", () => {
    test("ServiceFactory should register services in ServiceLocator", async () => {
        const serviceFactory = new ServiceFactory(Services);
        await serviceFactory.registerServices();
        const serviceLocator = ServiceLocator.getInstance();
        expect(serviceLocator.getService("TestService")).toBeInstanceOf(TestService);
    });

    test("ServiceFactory should unregister services in ServiceLocator", async () => {
        const serviceFactory = new ServiceFactory(Services);
        await serviceFactory.registerServices();
        await serviceFactory.unregisterServices();
        const serviceLocator = ServiceLocator.getInstance();
        expect(() => serviceLocator.getService("TestService")).toThrow();
    });

    test("ServiceFactory should trigger beforeMount hook in all services", async () => {
        const serviceFactory = new ServiceFactory(Services);
        const beforeMount = jest.spyOn(TestService.prototype, "beforeMount");
        await serviceFactory.registerServices();
        expect(beforeMount).toHaveBeenCalled();
    });

    test("ServiceFactory should trigger mounted hook in all services", async () => {
        const serviceFactory = new ServiceFactory(Services);
        const mounted = jest.spyOn(TestService.prototype, "mounted");
        await serviceFactory.registerServices();
        expect(mounted).toHaveBeenCalled();
    });

    test("ServiceFactory should trigger unmounted hook in all services", async () => {
        const serviceFactory = new ServiceFactory(Services);
        const unmounted = jest.spyOn(TestService.prototype, "unmounted");
        await serviceFactory.registerServices();
        await serviceFactory.unregisterServices();
        expect(unmounted).toHaveBeenCalled();
    });
});