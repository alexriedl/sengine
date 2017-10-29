export function createFromElementId(canvasId: string): WebGLRenderingContext {
	const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
	return createFromElement(canvas);
}

export function createFromElement(canvas: HTMLCanvasElement): WebGLRenderingContext {
	const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext;
	if (!gl) throw new Error('Unable to initialize WebGL. Your browser may not support it.');
	return gl;
}
