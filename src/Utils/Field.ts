export default class Field<T> {
	private _isDirty: boolean;
	private _value: T;

	public constructor(defaultValue?: T, defaultDirty: boolean = true) {
		this._value = defaultValue;
		this._isDirty = defaultDirty;
	}

	public markClean(): void { this._isDirty = false; }
	public markDirty(): void { this._isDirty = true; }
	public get IsDirty(): boolean { return this._isDirty; }
	public get Value(): T { return this._value; } public set Value(value: T) {
		if (this._value !== value) {
			this._value = value;
			this._isDirty = true;
		}
	}
}
