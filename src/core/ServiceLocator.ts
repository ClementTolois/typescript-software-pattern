class ServiceLocator {
    private static _instance: ServiceLocator;
    private _services: Map<string, any>;

    private constructor() {
        this._services = new Map<string, any>();
    }

    public static getInstance(): ServiceLocator {
        if (!ServiceLocator._instance) {
            ServiceLocator._instance = new ServiceLocator();
        }
        return ServiceLocator._instance;
    }

    public registerService(name: string, service: any): void {
        this._services.set(name, service);
    }

    public getService(name: string): any {
        const service = this._services.get(name);
        if(!service) {
            throw new Error(`Service ${name} not found`);
        }
        return service;
    }
}

export default ServiceLocator;