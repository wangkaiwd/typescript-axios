export default class Cancel {
  message?: string;

  constructor(message?: string) {
    this.message = message;
  }
}

export function isCancel(value: any): value is InstanceType<typeof Cancel> {
  return value instanceof Cancel;
}
