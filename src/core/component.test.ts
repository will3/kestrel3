import Component from "./component";
import Entity from "./entity";

class Component1 extends Component { };

class Component2 extends Component { };

describe('Component', () => {
    it('getComponent finds sibling', () => {
        const entity = new Entity();
        const a = new Component1();
        const b = new Component2();

        entity.addComponent(a);
        entity.addComponent(b);

        const found = a.getComponent(Component2);

        expect(found).toBe(b);
    });
});