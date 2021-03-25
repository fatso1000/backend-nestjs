// DECIDE QUE SE VA ENVIAR ENTRE EL CLIENTE Y EL SERVIDOR
export class CreateProductDTO {
  readonly title: string;
  readonly description: string;
  readonly genres: string[];
  readonly imageURL?: string;
  readonly price: number;
  readonly createdAt?: Date;
}
