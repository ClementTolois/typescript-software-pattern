abstract class Service {
    abstract beforeMount(): Promise<void>;
    abstract mounted(): Promise<void>;
    abstract unmounted(): Promise<void>;

    protected wait(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

export default Service;