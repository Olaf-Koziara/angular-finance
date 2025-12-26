import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Budget, BudgetResponse } from '../models/budget.model';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.API_URL}/budgets`;

  getBudget(): Observable<Budget> {
    return this.http.get<BudgetResponse>(this.apiUrl).pipe(
      tap((res) => console.log(res)),
      map((response) => response.data),
      catchError((error) => {
        console.error('Error fetching budget:', error);
        throw error;
      })
    );
  }

  updateGeneralBudget(amount: number): Observable<Budget> {
    return this.http.put<BudgetResponse>(`${this.apiUrl}/general`, { amount }).pipe(
      map((response) => response.data),
      catchError((error) => {
        console.error('Error updating general budget:', error);
        throw error;
      })
    );
  }

  updateCategoryBudget(category: string, amount: number): Observable<Budget> {
    return this.http.put<BudgetResponse>(`${this.apiUrl}/category`, { category, amount }).pipe(
      map((response) => response.data),
      catchError((error) => {
        console.error('Error updating category budget:', error);
        throw error;
      })
    );
  }

  updateBudget(budget: Budget): Observable<Budget> {
    return this.http.put<BudgetResponse>(this.apiUrl, budget).pipe(
      map((response) => response.data),
      catchError((error) => {
        console.error('Error updating budget:', error);
        throw error;
      })
    );
  }
}
