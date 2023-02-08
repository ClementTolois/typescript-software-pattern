import ServiceFactory from "./core/ServiceFactory";
const main = async () => {
    await ServiceFactory.registerServices();
    await ServiceFactory.unregisterServices();
};
main();