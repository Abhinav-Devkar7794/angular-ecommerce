import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../common/product';

import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private baseUrl = 'http://localhost:8080/api/products';
  private categoryUrl = 'http://localhost:8080/api/product-category';
  constructor(private httpClient : HttpClient) { }

  getProductList(theCategoryId : number) : Observable<Product[]>{
    const serchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    return this.httpClient.get<GetResponseProducts>(serchUrl).pipe(

      //@ToDo : need to build URL based on category id ... will come back to this !

      map(response => response._embedded.products)
    );
  }

  getProductcategories() : Observable<ProductCategory[]>{
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(

      //@ToDo : need to build URL based on category id ... will come back to this !

      map(response => response._embedded.productsCategory)
  }


}
interface GetResponseProducts{

  _embedded : {

    products : Product[];
  }
    
}

interface GetResponseProductCategory{

  _embedded : {

    productsCategory : ProductCategory[];
  }
    
}