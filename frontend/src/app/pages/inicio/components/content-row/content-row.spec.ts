import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentRow } from './content-row';

describe('ContentRow', () => {
  let component: ContentRow;
  let fixture: ComponentFixture<ContentRow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentRow],
    }).compileComponents();

    fixture = TestBed.createComponent(ContentRow);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
