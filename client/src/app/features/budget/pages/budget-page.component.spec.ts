import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BudgetPageComponent } from './budget-page.component';
import { BudgetService } from '../services/budget.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateModule } from '@ngx-translate/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { of, Subject } from 'rxjs';
import { Budget } from '../models/budget.model';

describe('BudgetPageComponent', () => {
  let component: BudgetPageComponent;
  let fixture: ComponentFixture<BudgetPageComponent>;
  let budgetServiceMock: jasmine.SpyObj<BudgetService>;
  let snackBarMock: jasmine.SpyObj<MatSnackBar>;

  const mockBudget: Budget = {
    generalBudget: 1000,
    categoryBudgets: {
      Food: 200,
      Transport: 100,
      Housing: 500,
      Utilities: 100,
      Entertainment: 0,
      Health: 50,
      Education: 50,
      Other: 0
    },
  };

  beforeEach(async () => {
    budgetServiceMock = jasmine.createSpyObj('BudgetService', ['get', 'update']);
    budgetServiceMock.get.and.returnValue(of(mockBudget));

    snackBarMock = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      imports: [BudgetPageComponent, TranslateModule.forRoot()],
      providers: [
        provideAnimations(),
        { provide: BudgetService, useValue: budgetServiceMock },
        { provide: MatSnackBar, useValue: snackBarMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BudgetPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle isSaving during saveBudget', () => {
    const updateSubject = new Subject<Budget>();
    budgetServiceMock.update.and.returnValue(updateSubject.asObservable());

    component.saveBudget();
    expect(component.isSaving()).toBeTrue();

    updateSubject.next(mockBudget);
    updateSubject.complete();

    expect(component.isSaving()).toBeFalse();
  });
});
