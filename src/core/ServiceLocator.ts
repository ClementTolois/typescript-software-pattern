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
        if (this._services.has(name)) {
            throw new Error(`Service ${name} already registered`);
        }
        this._services.set(name, service);
    }

    public getService(name: string): any {
        const service = this._services.get(name);
        if(!service) {
            throw new Error(`Service ${name} not found`);
        }
        return service;
    }

    public removeService(name: string): void {
        this._services.delete(name);
    }

    public removeAllServices(): void {
        this._services.clear();
    }
}


export default ServiceLocator;