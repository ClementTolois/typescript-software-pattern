import PostSub from "../core/PostSub";
import ServiceLocator from "../core/ServiceLocator";
import Service from "./Service";

class Service2 extends Service {
    private _postsub: PostSub;

    constructor() {
        super();
        this._postsub = ServiceLocator.getInstance().getService("PostSub");
    }

    async beforeMount(): Promise<void> {
        this._postsub.once("pong", () => {
            console.log("Pong received in Service2");
        });
    }

    async mounted(): Promise<void> {
        this._postsub.emit("ping");
    }

    async unmounted(): Promise<void> {
        await this.wait(2000);
        console.log("Unmounted in Service2")
    }
}

export default Service2;