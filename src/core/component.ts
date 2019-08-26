import guid from "uuid/v4";
import Entity from "./entity";
import { Object3D } from "three";

declare type constructor<T> = {
    new(...args: any[]): T;
};

export type Token<T = any> = constructor<T> | symbol;

export default class Component {
    _entity?: Entity;
    id = guid();
    started = false;
    shouldDestroy = false;
    destroyed = false;
    object = new Object3D();

    get entity() {
        return this._entity;
    }

    getComponent<T>(token: Token): T | undefined {
        if (this._entity == null) {
            throw new Error("Entity cannot be null");
        }

        const found = this._entity.components.find(c => {
            return (<any>c).constructor === token;
        });

        if (found != null) {
            return found as unknown as T;
        }

        return undefined;
    }

    update() { }
    start() { }
    destroy() { }
};