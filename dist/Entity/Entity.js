import { vec3, mat4 } from '../Math';
export default class Entity {
    constructor(model, position = new vec3(), scale = new vec3(1, 1, 1)) {
        this.children = [];
        this.model = model;
        this.position = position;
        this.scale = scale;
    }
    getRenderingPosition() {
        return this.position;
    }
    getRenderingScale() {
        return this.scale;
    }
    setParent(parent) {
        if (this.parent) {
            const index = this.parent.children.indexOf(this);
            if (index >= 0) {
                this.parent.children.splice(index, 1);
            }
        }
        if (parent) {
            parent.children.push(this);
        }
        this.parent = parent;
    }
    render(gl, vpMatrix, overridePosition, overrideScale) {
        const scale = overrideScale || this.getRenderingScale();
        const position = overridePosition || this.getRenderingPosition();
        const modelMatrix = mat4.fromTranslation(position).scale(scale);
        const mvpMatrix = modelMatrix.mul(vpMatrix);
        if (this.model) {
            this.model.useShader(gl);
            this.model.render(gl, mvpMatrix);
        }
        this.children.forEach((c) => {
            c.render(gl, mvpMatrix);
        });
    }
    update(deltaTime) {
        let childrenAnimating = false;
        for (const child of this.children) {
            const childAnimating = child.update(deltaTime);
            if (childAnimating)
                childrenAnimating = true;
        }
        return childrenAnimating;
    }
}
//# sourceMappingURL=Entity.js.map