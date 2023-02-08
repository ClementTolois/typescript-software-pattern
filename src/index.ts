import PostSub from "./core/PostSub";
import ServiceFactory from "./core/ServiceFactory";
import ServiceLocator from "./core/ServiceLocator";
const main = async () => {
    const serviceLocator = ServiceLocator.getInstance();
    serviceLocator.registerService("PostSub", new PostSub());
    await ServiceFactory.registerServices();
    await ServiceFactory.unregisterServices();
};
main();