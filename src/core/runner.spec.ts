import Runner from "./runner";
import Component from "./component";
import Entity from "./entity";

describe('Runner', () => {
    it('starts components once', () => {
        const runner = new Runner();
        const component = new Component();
        const start = jest.fn();
        component.start = start;

        runner.addEntity().addComponent(component);

        runner.update();
        runner.update();

        expect(start.mock.calls).toHaveLength(1);
    });

    it('updates components', () => {
        const runner = new Runner();
        const component = new Component();
        const update = jest.fn();
        component.update = update;

        runner.addEntity().addComponent(component);

        runner.update();

        expect(update.mock.calls).toHaveLength(1);
    });

    it('destroys components', () => {
        const runner = new Runner();
        const component = new Component();
        const destroy = jest.fn();
        component.destroy = destroy;

        const entity = runner.addEntity();
        entity.addComponent(component);

        runner.update();

        entity.removeComponent(component);
        
        runner.update();

        expect(destroy.mock.calls).toHaveLength(1);
    });

    it('removes components', () => {
        const runner = new Runner();
        const component = new Component();
        const destroy = jest.fn();
        component.destroy = destroy;

        const entity = runner.addEntity();
        entity.addComponent(component);

        runner.update();

        entity.removeComponent(component);
        
        runner.update();

        expect(destroy.mock.calls).toHaveLength(1);
        expect(entity.components).toHaveLength(0);
    });

    it('removes entities', () => {
        const runner = new Runner();
        const entity = runner.addEntity();
        const component = entity.addComponent(new Component());

        runner.removeEntity(entity);

        runner.update();

        expect(entity.destroyed).toBe(true);
        expect(component.destroyed).toBe(true);
    });
});