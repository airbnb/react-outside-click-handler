const isDOM = typeof window !== 'undefined';

export default isDOM
  ? function withDOM() { return this.extend('with DOM', {}); }
  : function withDOM() { return this.extend('without DOM', {}).skip(); };
