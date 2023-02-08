import PostSub from "../core/PostSub";

abstract class Service {
    public get postsub(): PostSub {
        return PostSub.getInstance();
    }

    public wait(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    abstract beforeMount(): Promise<void>;
    abstract mounted(): Promise<void>;
    abstract unmounted(): Promise<void>;
}

export default Service;