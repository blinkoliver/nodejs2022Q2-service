import { NotFoundException } from '@nestjs/common';
interface Instance {
  id: string;
}
export class DataBase<Entity extends Instance> {
  private db: Entity[] = [];
  private instance: new (data: Entity) => Entity;

  constructor(instance: { new (data: Entity): Entity }) {
    this.instance = instance;
  }

  create = async (params: Entity): Promise<Entity> => {
    return new Promise((resolve) => {
      this.db.push(params);
      resolve(params);
    });
  };

  readAll = async (): Promise<Entity[]> => {
    return new Promise((resolve) => {
      resolve(this.db.map((el: Entity) => el));
    });
  };

  read = async (id: string): Promise<Entity> => {
    return new Promise(async (resolve, reject) => {
      console.log('db', this.db);
      const data = this.db.find((el: Entity) => el.id === id);
      data ? resolve(data) : reject(new NotFoundException());
    });
  };

  update = async (id: string, updateData: Entity): Promise<Entity> => {
    return new Promise(async (resolve) => {
      const desired = await this.read(id);
      if (desired) {
        const newData = new this.instance(updateData);
        this.db = this.db.map((el: Entity) => (el.id === id ? newData : el));
        resolve(newData);
      }
    });
  };

  delete = async (id: string): Promise<boolean> => {
    return new Promise(async (resolve) => {
      this.db = this.db.filter((data: Entity) => data.id !== id);
      resolve(true);
    });
  };
}
