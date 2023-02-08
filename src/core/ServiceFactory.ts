import ServiceLocator from "./ServiceLocator";
import Service1 from "../services/Service1";
import Service2 from "../services/Service2";

interface ServiceConfig {
    name: string;
    service: any;
}

class ServiceFactory {
    private static _serviceLocator: ServiceLocator =
        ServiceLocator.getInstance();
    private static _servicesToRegister: ServiceConfig[] = [
        { name: "Service1", service: new Service1() },
        { name: "Service2", service: new Service2() },
    ];

    public static async registerServices(): Promise<void> {
        for (const serviceConfig of this._servicesToRegister) {
            this._serviceLocator.registerService(
                serviceConfig.name,
                serviceConfig.service
            );
        }

        await Promise.all(
            this._servicesToRegister.map((serviceConfig) => {
                return this._serviceLocator
                    .getService(serviceConfig.name)
                    .beforeMount();
            })
        );

        console.log("All services beforeMounted");

        await Promise.all(
            this._servicesToRegister.map((serviceConfig) => {
                return this._serviceLocator
                    .getService(serviceConfig.name)
                    .mounted();
            })
        );

        console.log("All services registered");
    }

    public static async unregisterServices(): Promise<void> {
        await Promise.all(
            this._servicesToRegister.map((serviceConfig) => {
                return this._serviceLocator
                    .getService(serviceConfig.name)
                    .unmounted();
            })
        );

        console.log("All services unregistered");
    }
}
export default ServiceFactory;
