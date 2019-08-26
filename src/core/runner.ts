import EntityManager from "./entityManager";
import Component from "./component";
import Entity from "./entity";
import _ from "lodash";
import Renderer from "./renderer";

export default class Runner {
    private entityManager: EntityManager;
    private renderer: Renderer = new Renderer();

    constructor(entityManager: EntityManager = new EntityManager()) {
        this.entityManager = entityManager;
        this.animate = this.animate.bind(this);
    }

    init() {
        this.renderer.init();
    }

    animate() {
        requestAnimationFrame(this.animate);
        this.update();
        this.renderer.render();
    }

    update() {
        this.visitComponents((component) => {
            if (!component.started) {
                component.start();
                component.started = true;

                this.renderer.scene.add(component.object);
            }
        });

        this.visitComponents((component) => {
            component.update();
        });

        this.visitComponents((component) => {
            if (component.shouldDestroy) {
                component.destroy();
                component.destroyed = true;
                
                this.renderer.scene.remove(component.object);
            }
        });

        this.visitEntities(entity => {
            _.remove(entity.components, c => c.destroyed);
        });

        this.visitEntities(entity => {
            if (entity.destroyed) {
                this.entityManager.removeEntity(entity);
            }
        });
    }

    addEntity() {
        const entity = new Entity();
        this.entityManager.addEntity(entity);
        return entity;
    }

    removeEntity(entity: Entity) {
        entity.destroy();
    }

    private visitComponents(callback: (component: Component) => void) {
        for (let id in this.entityManager.map) {
            const entity = this.entityManager.map[id];

            for (let i = 0; i < entity.components.length; i++) {
                const component = entity.components[i];
                callback(component);
            }
        }
    }

    private visitEntities(callback: (entity: Entity) => void) {
        for (let id in this.entityManager.map) {
            const entity = this.entityManager.map[id];
            callback(entity);
        }
    }
}