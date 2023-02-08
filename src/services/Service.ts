import PostSub from "../core/PostSub";

abstract class Service {
    private _name: string;

    constructor(name: string) {
        this._name = name;
    }

    public get name(): string {
        return this._name;
    }

    protected get _postsub(): PostSub {
        return PostSub.getInstance();
    }

    protected wait(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    protected async beforeMount(): Promise<void> {
        console.log(`Before mount triggered in ${this.name}`);
    }

    protected async mounted(): Promise<void> {
        console.log(`Mounted triggered in ${this.name}`);
    }

    protected async unmounted(): Promise<void> {
        console.log(`Unmounted triggered in ${this.name}`);
    }
}

export default Service;