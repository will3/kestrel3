import Entity from "./entity";

export default class EntityManager {
    _map: { [key: string]: Entity } = {};

    get map() {
        return this._map;
    }

    addEntity(entity: Entity) {
        this._map[entity.id] = entity;
    }

    removeEntity(entity: Entity) {
        delete this._map[entity.id];
    }
};