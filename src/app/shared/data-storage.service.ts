import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs/operators'; 
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Ingredient } from './ingredient.model';
import { AuthenticationService } from '../auth/auth.service';


@Injectable()
export class DataStorageService {

    constructor(private http: Http,
         private recipeService: RecipeService,
        private shoppingService: ShoppingListService,
        private authService: AuthenticationService){}

storeRecipes(){
    const token = this.authService.getToken();

    return this.http.put('https://ye-old-recipe-book.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes());
    }

getRecipes(){

   const token = this.authService.getToken();

this.http.get('https://ye-old-recipe-book.firebaseio.com/recipes.json?auth=' + token).pipe(map(
    (response: Response)=>{
        const recipes: Recipe[] = response.json();

        for(let recipe of recipes){
            if(!recipe['ingredients']){
                recipe['ingredients'] = [];
            }
        }
        return recipes
    }

)).subscribe(
(recipes: Recipe[])=>{

this.recipeService.replaceRecipes(recipes);

}

);
}


storeIngredients(){
    const token = this.authService.getToken();
    return this.http.put('https://ye-old-recipe-book.firebaseio.com/ingredients.json?auth=' + token, this.shoppingService.getIngredients());
}

fetchIngredients(){
    const token = this.authService.getToken();

    this.http.get('https://ye-old-recipe-book.firebaseio.com/ingredients.json?auth=' + token).subscribe(
(response: Response)=>{
    const ingredients: Ingredient[] = response.json();
this.shoppingService.replaceIngredients(ingredients);
}

    )
}



}