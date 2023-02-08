import ServiceFactory from "./core/ServiceFactory";
import Services from "./services/Services";
const main = async () => {
    const serviceFactory = new ServiceFactory(Services);
    await serviceFactory.registerServices();
    await serviceFactory.unregisterServices();
};
main();