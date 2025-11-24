import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SidebarComponent } from './sidebar.component';
import { ActivatedRoute, provideRouter } from '@angular/router';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  const mockTranslateService = {
    currentLang: 'en',
    defaultLang: 'en',
    use: jasmine.createSpy('use'),
    instant: jasmine.createSpy('instant').and.callFake((key: string) => key),
    get: jasmine.createSpy('get').and.returnValue({ subscribe: () => { } }),
    onLangChange: { subscribe: () => { } },
    onTranslationChange: { subscribe: () => { } },
    onDefaultLangChange: { subscribe: () => { } }
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SidebarComponent, NoopAnimationsModule, TranslateModule.forRoot()],
      providers: [
        provideRouter([]),
        { provide: TranslateService, useValue: mockTranslateService }
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
