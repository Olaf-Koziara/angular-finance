import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';

interface CategorySuggestionResponse {
  category: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategorySuggestionService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/transaction/suggest-category`;

  async suggestCategory(title: string): Promise<string> {
    const response = await firstValueFrom(
      this.http.post<CategorySuggestionResponse>(this.apiUrl, { title })
    );
    return response.category;
  }
}
