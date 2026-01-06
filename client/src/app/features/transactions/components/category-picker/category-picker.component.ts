import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  signal,
  inject,
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule } from '@ngx-translate/core';
import { TRANSACTION_CATEGORIES } from '../../constants/transaction-categories.constant';
import { CategorySuggestionService } from '../../services/category-suggestion.service';

@Component({
  selector: 'app-category-picker',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    TranslateModule,
  ],
  templateUrl: './category-picker.component.html',
  styleUrl: './category-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryPickerComponent {
  private readonly categorySuggestionService = inject(CategorySuggestionService);

  readonly categories = input<string[]>([...TRANSACTION_CATEGORIES]);
  readonly title = input.required<string>();
  readonly selectedCategory = input<string>('');
  readonly hasError = input<boolean>(false);
  readonly errorMessage = input<string>('');

  readonly categoryChange = output<string>();

  readonly isLoadingSuggestion = signal(false);

  onCategoryChange(category: string): void {
    this.categoryChange.emit(category);
  }

  async getSuggestion(): Promise<void> {
    const currentTitle = this.title();
    if (!currentTitle.trim()) {
      return;
    }

    this.isLoadingSuggestion.set(true);
    try {
      const suggestedCategory = await this.categorySuggestionService.suggestCategory(currentTitle);
      if (suggestedCategory) {
        this.categoryChange.emit(suggestedCategory);
      }
    } catch (error) {
      console.error('Failed to get category suggestion:', error);
    } finally {
      this.isLoadingSuggestion.set(false);
    }
  }
}
