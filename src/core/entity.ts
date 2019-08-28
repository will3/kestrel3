import "reflect-metadata";

import guid from "uuid/v4";
import Component from "./component";
import _ from "lodash";
import { container, InjectionToken } from "tsyringe";

export default class Entity {
    id = guid();
    _components: Component[] = [];
    destroyed = false;

    get components() {
        return this._components;
    }

    addComponent<T extends Component>(component: T | InjectionToken<T>): T  {
        if (!(component instanceof Component)) {
            component = container.resolve(component);
        }
        
        this._components.push(component);
        if (component._entity != null) {
            if (component._entity == this) {
                throw new Error("Already added to this entity");
            } else {
                throw new Error("Already added to another entity");
            }
        }
        component._entity = this;

        return component;
    }

    removeComponent(component: Component) {
        if (!_.includes(this._components, component)) {
            throw new Error(`Component ${component.id} not found in this entity`);
        }
        
        component.shouldDestroy = true;
    }

    destroy() {
        this._components.forEach(c => {
            c.shouldDestroy = true;
        });
        this.destroyed = true;
    }
};