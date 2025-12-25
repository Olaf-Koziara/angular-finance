import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Budget, BudgetResponse, CategoryBudget } from '../models/budget.model';
import { TRANSACTION_CATEGORIES } from '../../transactions/constants/transaction-categories.constant';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.API_URL}/budgets`;

  getBudget(): Observable<Budget> {
    // TODO: Replace with actual API call when backend is ready
    // return this.http.get<BudgetResponse>(this.apiUrl).pipe(
    //   map((response) => response.data),
    //   catchError((error) => {
    //     console.error('Error fetching budget:', error);
    //     throw error;
    //   })
    // );

    // Mock data for now
    return of({
      id: '1',
      generalBudget: 5000,
      categoryBudgets: TRANSACTION_CATEGORIES.map((category) => ({
        category,
        amount: 500,
      })),
    });
  }

  updateGeneralBudget(amount: number): Observable<Budget> {
    // TODO: Replace with actual API call when backend is ready
    // return this.http.put<BudgetResponse>(`${this.apiUrl}/general`, { amount }).pipe(
    //   map((response) => response.data),
    //   catchError((error) => {
    //     console.error('Error updating general budget:', error);
    //     throw error;
    //   })
    // );

    // Mock implementation
    return this.getBudget().pipe(
      map((budget) => ({
        ...budget,
        generalBudget: amount,
      }))
    );
  }

  updateCategoryBudget(category: string, amount: number): Observable<Budget> {
    // TODO: Replace with actual API call when backend is ready
    // return this.http.put<BudgetResponse>(`${this.apiUrl}/category/${category}`, { amount }).pipe(
    //   map((response) => response.data),
    //   catchError((error) => {
    //     console.error('Error updating category budget:', error);
    //     throw error;
    //   })
    // );

    // Mock implementation
    return this.getBudget().pipe(
      map((budget) => ({
        ...budget,
        categoryBudgets: budget.categoryBudgets.map((cb) =>
          cb.category === category ? { ...cb, amount } : cb
        ),
      }))
    );
  }

  updateBudget(budget: Budget): Observable<Budget> {
    // TODO: Replace with actual API call when backend is ready
    // return this.http.put<BudgetResponse>(this.apiUrl, budget).pipe(
    //   map((response) => response.data),
    //   catchError((error) => {
    //     console.error('Error updating budget:', error);
    //     throw error;
    //   })
    // );

    // Mock implementation
    return of(budget);
  }
}
