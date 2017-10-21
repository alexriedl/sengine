const registrar = {};
export function register(type, item) {
    const name = type.name;
    if (!registrar[name])
        registrar[name] = [];
    registrar[name].push(item);
}
export function unregisterAll(type, action) {
    const name = type.name;
    const items = registrar[name];
    delete registrar[name];
    if (items && action) {
        for (const item of items) {
            action(item);
        }
    }
}
export class GLRegister {
    initialize(gl) {
        return;
    }
}
export function registerGLItem(item) {
    register(GLRegister, item);
}
export function initializeGLItems(gl) {
    unregisterAll(GLRegister, (item) => {
        item.initialize(gl);
    });
}
//# sourceMappingURL=Register.js.map