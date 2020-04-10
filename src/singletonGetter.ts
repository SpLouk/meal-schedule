export function singletonGetter<T>(InstanceConstructor: { new (): T }) {
    let instance: T;

    const getter = (): T => {
        if (instance === undefined) {
            instance = new InstanceConstructor();
        }

        return instance;
    };
    return getter;
}
