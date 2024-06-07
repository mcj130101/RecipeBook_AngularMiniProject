import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }
  getIngredient(index: number): Ingredient {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    const availableIndex = this.ingredients.findIndex(
      (ing) => ing.name === ingredient.name
    );
    if (availableIndex != -1) {
      this.ingredients[availableIndex] = new Ingredient(
        ingredient.name,
        this.ingredients[availableIndex].amount + ingredient.amount
      );
    } else {
      this.ingredients.push(ingredient);
    }

    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    // for (let ingredient of ingredients) {
    //   this.addIngredient(ingredient);
    // }
    for (const ingredient of ingredients) {
      const availableIndex = this.ingredients.findIndex(
        (ing) => ing.name === ingredient.name
      );
      if (availableIndex != -1) {
        this.ingredients[availableIndex] = new Ingredient(
          ingredient.name,
          this.ingredients[availableIndex].amount + ingredient.amount
        );
      } else {
        this.ingredients.push(ingredient);
      }
    }
    // this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(index: number, updatedIngredient: Ingredient) {
    this.ingredients[index] = updatedIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
