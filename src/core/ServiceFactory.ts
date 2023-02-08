import ServiceLocator from "./ServiceLocator";

export interface ServiceConfig {
    name: string;
    service: any;
    options?: any;
}

export enum HOOK {
    beforeMount = "beforeMount",
    mounted = "mounted",
    unmounted = "unmounted",
}

class ServiceFactory {
    private  _serviceLocator: ServiceLocator = ServiceLocator.getInstance();
    private _servicesToRegister: ServiceConfig[];

    constructor(services: ServiceConfig[]) {
        this._servicesToRegister = services;
    }

    public async registerServices(): Promise<void> {
        for (const serviceConfig of this._servicesToRegister) {
            this._serviceLocator.registerService(serviceConfig.name, new serviceConfig.service());
        }
        await this.triggerHook(HOOK.beforeMount);
        await this.triggerHook(HOOK.mounted);
    }

    public async unregisterServices(): Promise<void> {
        await this.triggerHook(HOOK.unmounted);
        for (const serviceConfig of this._servicesToRegister) {
            this._serviceLocator.removeService(serviceConfig.name);
        }
    }

    private async triggerHook(hook: HOOK): Promise<void> {
        await Promise.all(
            this._servicesToRegister.map((serviceConfig) => {
                return this._serviceLocator.getService(serviceConfig.name)[hook]();
            })
        );
        console.log(`Hook ${hook} triggered in all services`);
    }
}
export default ServiceFactory;
