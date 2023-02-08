import ServiceLocator from "./ServiceLocator";
import Service1 from "../services/Service1";
import Service2 from "../services/Service2";
import Service3 from "../services/Service3";

interface ServiceConfig {
    name: string;
    service: any;
    options?: any;
}

enum HOOK {
    beforeMount = "beforeMount",
    mounted = "mounted",
    unmounted = "unmounted",
}

class ServiceFactory {
    private static _serviceLocator: ServiceLocator = ServiceLocator.getInstance();
    private static _servicesToRegister: ServiceConfig[] = [
        { name: "Service1", service: Service1 },
        { name: "Service3", service: Service3 },
        { name: "Service2", service: Service2 },
    ];

    public static async registerServices(): Promise<void> {
        for (const serviceConfig of this._servicesToRegister) {
            this._serviceLocator.registerService(serviceConfig.name, new serviceConfig.service());
        }
        await this.triggerHook(HOOK.beforeMount);
        await this.triggerHook(HOOK.mounted);
    }

    public static async unregisterServices(): Promise<void> {
        await this.triggerHook(HOOK.unmounted);
    }

    private static async triggerHook(hook: HOOK): Promise<void> {
        await Promise.all(
            this._servicesToRegister.map((serviceConfig) => {
                return this._serviceLocator.getService(serviceConfig.name)[hook]();
            })
        );
        console.log(`Hook ${hook} triggered in all services`);
    }
}
export default ServiceFactory;
